const mongoose = require("mongoose");

const photographerPhotoSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const PhotographerPhoto =
  mongoose.models?.PhotographerPhoto ||
  mongoose.model("PhotographerPhoto", photographerPhotoSchema);
module.exports = PhotographerPhoto;
