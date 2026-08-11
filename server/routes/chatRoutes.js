const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { aiChat } = require("../controllers/chatController");

router.post("/", protect, aiChat);

module.exports = router;
