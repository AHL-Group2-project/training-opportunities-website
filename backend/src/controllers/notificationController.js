import Notification from "../models/Notification.js";

// GET /api/notifications
export const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipientId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/notifications/:id/read
export const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipientId: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notification);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/notifications/read-all
export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipientId: req.user._id, read: false },
      { read: true }
    );

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    next(error);
  }
};

// Utility function to create a notification internally (not an endpoint)
export const createNotification = async ({
  recipientId,
  senderId,
  type,
  message,
  link,
}) => {
  try {
    await Notification.create({
      recipientId,
      senderId,
      type,
      message,
      link,
    });
  } catch (error) {
    console.error("Failed to create notification:", error);
  }
};
