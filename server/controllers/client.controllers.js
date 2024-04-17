const BookingUpdates = require("../models/booking_updates.model");
const Booking = require("../models/bookings.model");
const Client = require("../models/client.model");

const deleteClient = async (req, res, next) => {
  const { clientId } = req.params;

  try {
    const client = await Client.findById(clientId);
    if (!client) throw new Error("No client found");
    // await Booking.deleteMany({ createdBy: clientId });
    await Booking.deleteMany({ createdBy: clientId, status: "pending" });
    await Client.findByIdAndDelete(clientId);
    // await BookingUpdates.deleteMany({ clientId });
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteClient };
