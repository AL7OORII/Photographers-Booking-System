const mongoose = require("mongoose");

const bookingUpdatesSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    message: {
      type: String,
    },
    updatePhotos: [
      {
        secure_url: {
          type: String,
          required: true,
        },
        asset_id: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);


bookingUpdatesSchema.set("toObject", { virtuals: true });
bookingUpdatesSchema.set("toJSON", { virtuals: true });

const BookingUpdates =
  mongoose.models?.BookingUpdates ||
  mongoose.model("BookingUpdates", bookingUpdatesSchema);

module.exports = BookingUpdates;
