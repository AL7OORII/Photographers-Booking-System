const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Mixed,
      enum: [
        "new-booking" |
          "message" |
          "photo-update" |
          "booking-status" |
          "review",
      ],
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    photographerId: {
      type: String,
      required: true,
    },
    status: {
      type: mongoose.Mixed,
      enum: ["read" | "unread"],
      required: true,
      default: "unread",
    },
    source: {
      type: mongoose.Mixed,
      enum: ["client" | "photographer"],
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

notificationSchema.virtual("client", {
  ref: "Client",
  localField: "clientId",
  foreignField: "_id",
  justOne: true,
  options: {
    select: "-password -createdAt -updatedAt",
  },
});

notificationSchema.virtual("photographer", {
  ref: "Photographer",
  localField: "photographerId",
  foreignField: "_id",
  justOne: true,
  options: {
    select: "-password -createdAt -updatedAt",
  },
});

notificationSchema.set("toObject", { virtuals: true });
notificationSchema.set("toJSON", { virtuals: true });

const Notification =
  mongoose.models?.Notification ||
  mongoose.model("Notification", notificationSchema);

module.exports = Notification;
