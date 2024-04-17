const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const {
  photographerSignUp,
  clientSignUp,
  login,
  getUserProfile,
} = require("../controllers/auth.contollers");
const router = express.Router();

router.post("/signup/photographer", photographerSignUp);
router.post("/signup/client", clientSignUp);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
