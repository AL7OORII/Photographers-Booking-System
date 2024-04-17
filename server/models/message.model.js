const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    status: {
      type: mongoose.Mixed,
      default: "unread",
      enum: ["unread" | "read"],
    },
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    sender: {
      type: mongoose.Mixed,
      required: true,
      enum: ["client" | "photographer"],
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
  },
  { timestamps: true }
);

// Define virtual field for photographer
messageSchema.virtual("photographer", {
  ref: "Photographer",
  localField: "photographerId",
  foreignField: "_id",
  justOne: true,
  options: {
    select: "first_Name last_Name ",
  },
});

messageSchema.virtual("client", {
  ref: "Client",
  localField: "clientId",
  foreignField: "_id",
  justOne: true,
  options: {
    select: "first_Name last_Name",
  },
});

messageSchema.set("toObject", { virtuals: true });
messageSchema.set("toJSON", { virtuals: true });

const Message =
  mongoose.models?.Message || mongoose.model("Message", messageSchema);

module.exports = Message;
