const Photographer = require("../models/photographer.model");
const cloudinary = require("../cloudinary/cloudinary");
const PhotographerPhoto = require("../models/photographer_photo.model");
const PhotographerReview = require("../models/photographer_reviews.model");
const Booking = require("../models/bookings.model");
const Notification = require("../models/notification.model");

const getPhotographerDetails = async (req, res, next) => {
  const { photographerId } = req.params;
  try {
    if (photographerId) {
      const photographer = await Photographer.findById(photographerId)
        .select("-password ")
        .populate("photos");
      res.status(200).json({ photographer, message: "photographer details" });
    }
  } catch (error) {
    next(error);
  }
};

const uploadPhotographerImages = async (req, res, next) => {
  const { photographerId } = req.params;
  try {
    await cloudinary.uploader.upload(
      req.body.values,
      {
        timeout: 1200000,
        upload_preset: "photo_preset",
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          next(error);
        }
        if (result) {
          await PhotographerPhoto.create({
            secure_url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
            createdBy: photographerId,
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

const getAllPhotographerPhotos = async (req, res, next) => {
  const { photographerId } = req.params;
  try {
    const images = await PhotographerPhoto.find({
      createdBy: photographerId,
    });

    res.status(200).json({ images, message: "photographer images" });
  } catch (error) {
    next(error);
  }
};

const getTopRatedPhotographer = async (req, res, next) => {
  try {
    const photographers = await Photographer.find({})
      .sort("ratings")
      .limit(10)
      .select("-password -createdAt -updatedAt ");
    // $or: [
    //   { ratings: { $gt: 13, $lt: 27 } },
    //   { ratings: null },
    //   { ratings: { $exists: false } },
    // ],

    res.status(200).json({ photographers, message: "top rated photographers" });
  } catch (error) {
    next(error);
  }
};

const addPhotographerRatingAndReview = async (req, res, next) => {
  const { bookingId } = req.params;
  const { createdBy, photographerId, text, rating } = req.body;
  const session = await Photographer.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(bookingId);
    const photographer = await Photographer.findById(photographerId);
    const review = await PhotographerReview.create(
      [{ createdBy, text, photographerId }],
      {
        session,
      }
    );
    photographer.ratings.push(rating);
    booking.client_rated = true;
    await photographer.save();
    await booking.save();

    const notification = await Notification.create(
      [
        {
          type: "review",
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
      await PhotographerReview.findByIdAndDelete(review._id);
      throw new Error("Failed to create notification");
    }
    await session.commitTransaction();
    await session.endSession();

    res.status(201).json({ message: "Sent successfully" });
  } catch (error) {
    await session.commitTransaction();
    await session.endSession();
    next(error);
  }
};

const getPhotographerReviews = async (req, res, next) => {
  const { photographerId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const totalReviews = await PhotographerReview.countDocuments({
      photographerId,
    });
    const totalPages = Math.ceil(totalReviews / limit);

    const data = await PhotographerReview.find({ photographerId })
      .populate("client")
      .skip((page - 1) * limit)
      .limit(limit);

    const metadata = {
      totalReviews,
      totalPages,
      currentPage: page,
      perPage: limit,
      nextPage: page < totalPages,
      previousPage: page > 1,
    };
    res.status(200).json({ data, metadata, message: "photographer reviews" });
  } catch (error) {
    next(error);
  }
};

const updatePhotographerDetails = async (req, res, next) => {
  const photographerId = req.photographer.photographerId;
  console.log(photographerId);
  try {
    await Photographer.findByIdAndUpdate(
      photographerId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    next(error);
  }
};

const updatePhotographerPassword = async (req, res, next) => {
  const photographerId = req.photographer.photographerId;
  try {
    const { old_password, new_password } = req.body;

    const photographer = await Photographer.findById(photographerId);

    const passwordMatch = await photographer.comparePassword(old_password);

    if (!passwordMatch) throw new Error("Invalid credentials");

    photographer.password = new_password;

    await photographer.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deletePhotographerPhoto = async (req, res, next) => {
  const { photoId } = req.params;
  try {
    const photo = await PhotographerPhoto.findById(photoId);

    await cloudinary.uploader.destroy(photo.public_id).then(async (result) => {
      await PhotographerPhoto.findByIdAndDelete(photoId);
    });

    return res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const deletePhotographer = async (req, res, next) => {
  const { photographerId } = req.params;

  try {
    const photographer = await Photographer.findById(photographerId);
    if (!photographer) throw new Error("No photographer found");

    const photos = await PhotographerPhoto.find({ createdBy: photographerId });

    const photoArrays = photos.map((photo) => photo.public_id);

    if (photoArrays.length > 0) {
      await cloudinary.api.delete_resources(photoArrays);
    }

    // await Booking.deleteMany({ createdBy: clientId });
    await Booking.deleteMany({ photographerId, status: "pending" });
    await Photographer.findByIdAndDelete(photographerId);
    // await BookingUpdates.deleteMany({ clientId });
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getPhotographerDetails,
  uploadPhotographerImages,
  getAllPhotographerPhotos,
  getTopRatedPhotographer,
  getPhotographerReviews,
  addPhotographerRatingAndReview,
  updatePhotographerDetails,
  updatePhotographerPassword,
  deletePhotographerPhoto,
  deletePhotographer,
};
