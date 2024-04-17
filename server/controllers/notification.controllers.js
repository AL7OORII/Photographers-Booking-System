const Notification = require("../models/notification.model");

const getAllUserNotifications = async (req, res, next) => {
  try {
    if (req.client.clientId) {
      const clientId = req.client.clientId;
      const notifications = await Notification.find({
        clientId,
        source: "photographer",
      })
        .populate("photographer")
        .sort("-createdAt");
      return res
        .status(200)
        .json({ notifications, message: "user notifications" });
    }
    if (req.photographer.photographerId) {
      const photographerId = req.photographer.photographerId;
      const notifications = await Notification.find({
        photographerId,
        source: "client",
      })
        .populate("client")
        .sort("-createdAt");
      return res
        .status(200)
        .json({ notifications, message: "user notifications" });
    }
  } catch (error) {
    next(error);
  }
};

const updateNotificationStatus = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);
    notification.status = "read";
    await notification.save();
    return res.status(200).json({ message: "Notification status updated" });
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllUserNotifications, updateNotificationStatus };
