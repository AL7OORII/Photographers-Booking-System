const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    photography_style: [
      {
        type: String,
      },
    ],
    rating: [
      {
        type: Number,
        enum: {
          values: [1, 2, 3, 4, 5],
          message: "Rating must be an integer between 1 and 5",
        },
      },
    ],
  },
  { timestamps: true }
);

feedbackSchema.set("toObject", { virtuals: true });
feedbackSchema.set("toJSON", { virtuals: true });

const Feedback =
  mongoose.models?.Feedback || mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
