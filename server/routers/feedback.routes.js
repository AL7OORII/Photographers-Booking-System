const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const { createFeedback } = require("../controllers/feedback.cotrollers");

const router = express.Router();

//create booking
router.post("/", authMiddleware, createFeedback);

module.exports = router;
