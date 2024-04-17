const Feedback = require("../models/feedback.model");

const createFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.create({
      ...req.body,
    });
    res.status(201).json({ message: "Feedback sent successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFeedback,
};
