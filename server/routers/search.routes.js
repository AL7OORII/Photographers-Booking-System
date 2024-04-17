const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const { searchPhotographer } = require("../controllers/search.controllers");
const router = express.Router();

router.get("/", searchPhotographer);

module.exports = router;
