const mongoose = require("mongoose");

const clientPhotoSchema = new mongoose.Schema(
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
  },
  { timestamps: true }
);

const ClientPhoto =
  mongoose.models?.ClientPhoto ||
  mongoose.model("ClientPhoto", clientPhotoSchema);
module.exports = ClientPhoto;
