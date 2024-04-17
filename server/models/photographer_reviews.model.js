const mongoose = require("mongoose");

const photographerReviewsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
      required: true,
    },
  },
  { timestamps: true }
);

photographerReviewsSchema.virtual("client", {
  ref: "Client",
  localField: "createdBy",
  foreignField: "_id",
  justOne: true,
  options: {
    select: "first_Name last_Name ",
  },
});

photographerReviewsSchema.set("toObject", { virtuals: true });
photographerReviewsSchema.set("toJSON", { virtuals: true });

const PhotographerReview =
  mongoose.models?.PhotographerReview ||
  mongoose.model("PhotographerReview", photographerReviewsSchema);

module.exports = PhotographerReview;
