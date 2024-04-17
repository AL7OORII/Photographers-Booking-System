const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    date: {
      required: true,
      type: Date,
    },
    status: {
      type: mongoose.Mixed,
      default: "pending",
      enum: ["pending" | "accepted" | "rejected" | "completed" | "closed"],
    },
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
      required: true,
    },
    clientPhotos: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ClientPhoto" },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    booking_updates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingUpdates",
      },
    ],
    photographer_done: {
      type: Boolean,
      default: false,
    },
    client_accepted: {
      type: Boolean,
      default: false,
    },
    client_rated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


bookingSchema.virtual("photographer", {
  ref: "Photographer",
  localField: "photographerId",
  foreignField: "_id",
  justOne: true,
  options: {
    select: "-password -createdAt -updatedAt",
  },
});

bookingSchema.virtual("client", {
  ref: "Client",
  localField: "createdBy",
  foreignField: "_id",
  justOne: true,
  options: {
    select: "-password -createdAt -updatedAt",
  },
});

bookingSchema.set("toObject", { virtuals: true });
bookingSchema.set("toJSON", { virtuals: true });

const Booking =
  mongoose.models?.Booking || mongoose.model("Booking", bookingSchema);

module.exports = Booking;
