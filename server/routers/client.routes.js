const express = require("express");
const authMiddleware = require("../middlewares/authentication");
const { deleteClient } = require("../controllers/client.controllers");

const router = express.Router();

router.delete("/:clientId", authMiddleware, deleteClient);

module.exports = router;
