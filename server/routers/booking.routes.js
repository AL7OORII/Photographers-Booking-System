const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const {
  createBooking,
  getAllBookings,
  getBooking,
  sendMessage,
  getBookingMessages,
  updateBookingStatus,
  sendPhotographerBookingUpdate,
  getphotographerBookingUpdate,
  uploadFinishedPhoto,
  getAllUploadedFinishedPhoto,
  updateClientAcceptedStatus,
  deleteBooking,
  deleteFinishedPhoto,
} = require("../controllers/booking.controller");

const router = express.Router();

//create booking
router.post("/message", authMiddleware, sendMessage);

router.post("/update", authMiddleware, sendPhotographerBookingUpdate);
router.post("/:photographerId", authMiddleware, createBooking);

//upload finished photo
router.post("/upload/:photographerId", authMiddleware, uploadFinishedPhoto);
router.get(
  "/upload/:bookingId",
  authMiddleware,
  getAllUploadedFinishedPhoto
);
router.patch(
  "/client-accepted/:bookingId",
  authMiddleware,
  updateClientAcceptedStatus
);

//get photographer booking updates
router.get("/update/:bookingId", authMiddleware, getphotographerBookingUpdate);
router.get("/:bookingId", authMiddleware, getBooking);
router.get("/", authMiddleware, getAllBookings);
router.get("/message/:bookingId", authMiddleware, getBookingMessages);
router.patch("/:bookingId", authMiddleware, updateBookingStatus);

//delete booking 
router.delete("/:bookingId", authMiddleware, deleteBooking);

//delete finished photo
router.delete("/upload/:photoId", authMiddleware, deleteFinishedPhoto);

module.exports = router;
