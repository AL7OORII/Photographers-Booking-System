const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const {
  getAllUserNotifications,
  updateNotificationStatus,
} = require("../controllers/notification.controllers");

const router = express.Router();

router.get("/", authMiddleware, getAllUserNotifications);
router.patch("/:notificationId", authMiddleware, updateNotificationStatus);

module.exports = router;
