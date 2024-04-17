const cloudinary = require("../cloudinary/cloudinary");
const BookingUpdates = require("../models/booking_updates.model");
const Booking = require("../models/bookings.model");
const Client = require("../models/client.model");
const ClientPhoto = require("../models/client_photos.model");
const Message = require("../models/message.model");
const Notification = require("../models/notification.model");
const Photographer = require("../models/photographer.model");
const { sendSMS } = require("../utils/utils");


const createBooking = async (req, res, next) => {
  const { clientId } = req.client;
  const { photographerId } = req.params;
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.create(
      [
        {
          ...req.body,
          createdBy: clientId,
          photographerId,
        },
      ],
      { session }
    );

    const notification = await Notification.create(
      [
        {
          type: "new-booking",
          clientId,
          photographerId,
          source: "client",
          bookingId: booking[0]._id,
        },
      ],
      { session }
    );

    if (!notification) {
      await session.abortTransaction();
      await session.endSession();
      await Booking.deleteMany({ photographerId, createdBy: clientId });
      throw new Error("Failed to create notification");
    }
    const photographer = await Photographer.findById(photographerId);
    await sendSMS(photographer.phone_Number, "You have a new booking request");
    await session.commitTransaction();
    await session.endSession();

    res.status(201).json({ booking, message: "Booking successfully" });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    if (req.client.clientId) {
      const clientId = req.client.clientId;

      const bookings = await Booking.find({ createdBy: clientId })
        .populate("photographer")
        .sort("createdAt");
      return res.status(200).json({ bookings, message: "user bookings" });
    }
    if (req.photographer.photographerId) {
      const photographerId = req.photographer.photographerId;
      const bookings = await Booking.find({ photographerId })
        .populate("client")
        .sort("createdAt");
      return res.status(200).json({ bookings, message: "user bookings" });
    }
  } catch (error) {
    next(error);
  }
};

const getBooking = async (req, res, next) => {
  const { bookingId } = req.params;
  try {
    if (req.client.clientId) {
      const booking = await Booking.findById(bookingId).populate(
        "photographer"
      );
      return res.status(200).json({ booking, message: "Booking details" });
    }

    if (req.photographer.photographerId) {
      const booking = await Booking.findById(bookingId).populate("client");
      return res.status(200).json({ booking, message: "Booking details" });
    }
  } catch (error) {
    next(error);
  }
};

//SEND MESSAGE
const sendMessage = async (req, res, next) => {
  const session = await Message.startSession();
  session.startTransaction();
  try {
    if (req.client.clientId) {
      const clientId = req.client.clientId;
      const message = await Message.create([{ ...req.body }], { session });
      const notification = await Notification.create(
        [
          {
            type: "message",
            clientId,
            photographerId: req.body.photographerId,
            source: "client",
            bookingId: req.body.bookingId,
          },
        ],
        { session }
      );

      const photographer = await Photographer.findById(req.body.photographerId);
      await sendSMS(photographer.phone_Number, "You have a new message");

      await session.commitTransaction();
      await session.endSession();

      return res.status(201).json({ message: "Message sent successfully" });
    }

    if (req.photographer.photographerId) {
      const photographerId = req.photographer.photographerId;

      const message = await Message.create([{ ...req.body }], { session });

      const notification = await Notification.create(
        [
          {
            type: "message",
            clientId: req.body.clientId,
            photographerId,
            source: "photographer",
            bookingId: req.body.bookingId,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      await session.endSession();
      const client = await Client.findById(req.body.clientId);

      await sendSMS(client.phone_Number, "You have a new message");
      return res.status(201).json({ message: "Message sent successfully" });
    }
  } catch (error) {
    await session.commitTransaction();
    await session.endSession();
    next(error);
  }
};

const getBookingMessages = async (req, res, next) => {
  const { bookingId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const totalMessages = await Message.countDocuments({ bookingId });
    const totalPages = Math.ceil(totalMessages / limit);

    const messages = await Message.find({ bookingId })
      .populate(["client", "photographer"])
      .skip((page - 1) * limit)
      .limit(limit);

    const metadata = {
      totalMessages,
      totalPages,
      currentPage: page,
      perPage: limit,
      nextPage: page < totalPages,
      previousPage: page > 1,
    };
    return res
      .status(200)
      .json({ messages, metadata, message: "Booking messages" });
  } catch (error) {
    next(error);
  }
};

// UPDATE BOOKING STATUS
const updateBookingStatus = async (req, res, next) => {
  const { bookingId } = req.params;
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const update = await Booking.findOneAndUpdate(
      { _id: bookingId },
      { ...req.body }
    );

    const notification = await Notification.create(
      [
        {
          type: "booking-status",
          clientId: update.createdBy,
          photographerId: update.photographerId,
          source: req.client.clientId ? "client" : "photographer",
          bookingId,
        },
      ],
      { session }
    );

    if (!notification) {
      await session.abortTransaction();
      await session.endSession();
    }


    const client = await Client.findById(update.createdBy);
      await sendSMS(client.phone_Number, "Booking status updated");

    await session.commitTransaction();
    await session.endSession();

    return res
      .status(200)
      .json({ message: "Booking status updated successfully" });
  } catch (error) {
    await session.commitTransaction();
    await session.endSession();
    next(error);
  }
};

const sendPhotographerBookingUpdate = async (req, res, next) => {
  const session = await BookingUpdates.startSession();
  session.startTransaction();

  try {
    const update = await BookingUpdates.create({ ...req.body });

    const notification = await Notification.create(
      [
        {
          type: "photo-update",
          clientId: req.body.clientId,
          photographerId: req.body.createdBy,
          source: "photographer",
          bookingId: req.body.bookingId,
        },
      ],
      { session }
    );

    if (!notification) {
      await session.abortTransaction();
      await session.endSession();
      await BookingUpdates.findByIdAndDelete(update._id);
      throw new Error("Failed to create notification");
    }

    await session.commitTransaction();
    await session.endSession();
    return res
      .status(200)
      .json({ message: "Update sent to client successfully" });
  } catch (error) {
    await session.commitTransaction();
    await session.endSession();
    next(error);
  }
};

const getphotographerBookingUpdate = async (req, res, next) => {
  const { bookingId } = req.params;
  try {
    const updates = await BookingUpdates.find({ bookingId });
    return res.status(200).json({ updates, message: "Booking updates" });
  } catch (error) {
    next(error);
  }
};

const uploadFinishedPhoto = async (req, res, next) => {
  const { photographerId } = req.params;
  try {
    await cloudinary.uploader.upload(
      req.body.image,
      {
        timeout: 1200000,
        upload_preset: "finished_photo",
      },
      async (error, result) => {
        if (error) {
          next(error);
        }
        if (result) {
          await ClientPhoto.create({
            secure_url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
            createdBy: photographerId,
            bookingId: req.body.bookingId,
          });
          return res
            .status(201)
            .json({ message: "Photo uploaded successfully" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

const getAllUploadedFinishedPhoto = async (req, res, next) => {
  const { bookingId } = req.params;
  try {
    const photos = await ClientPhoto.find({ bookingId });
    return res.status(200).json({ photos, message: "Finished photos" });
  } catch (error) {
    next(error);
  }
};

const updateClientAcceptedStatus = async (req, res, next) => {
  const { bookingId } = req.params;
  const { satisfied } = req.body;
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const booking = await Booking.findById(bookingId);
    booking.client_accepted = satisfied;
    await booking.save();

    const notification = await Notification.create(
      [
        {
          type: "photo-update",
          clientId: booking.createdBy,
          photographerId: booking.photographerId,
          source: "client",
          bookingId,
        },
      ],
      { session }
    );

    if (!notification) {
      await session.abortTransaction();
      await session.endSession();
      await BookingUpdates.findByIdAndDelete(update._id);
      throw new Error("Failed to create notification");
    }
    const photographer = await Photographer.findById(booking.photographerId);
      await sendSMS(photographer.phone_Number, "Client accepted photos");
    await session.commitTransaction();
    await session.endSession();

    return res.status(200).json({ message: "Booking completed" });
  } catch (error) {
    await session.commitTransaction();
    await session.endSession();
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) throw new Error("No booking found");

    const photos = await ClientPhoto.find({ bookingId });

    const photoArrays = photos.map((photo) => photo.public_id);

    if (photoArrays.length > 0) {
      await cloudinary.api.delete_resources(photoArrays);
    }

    //delete message
    await Message.deleteMany({ bookingId });

    //delete update
    await BookingUpdates.deleteMany({ bookingId });

    //delete photos
    await ClientPhoto.deleteMany({ bookingId });

    //delete Notifications
    await Notification.deleteMany({ bookingId });

    //delete booking
    await Booking.findByIdAndDelete(bookingId);

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteFinishedPhoto = async (req, res, next) => {
  const { photoId } = req.params;
  try {
    const photo = await ClientPhoto.findById(photoId);

    await cloudinary.uploader.destroy(photo.public_id).then(async (result) => {
      await ClientPhoto.findByIdAndDelete(photoId);
    });

    return res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBooking,
  sendMessage,
  getBookingMessages,
  updateBookingStatus,
  sendPhotographerBookingUpdate,
  getphotographerBookingUpdate,
  uploadFinishedPhoto,
  getAllUploadedFinishedPhoto,
  updateClientAcceptedStatus,
  deleteBooking,
  deleteFinishedPhoto,
};
