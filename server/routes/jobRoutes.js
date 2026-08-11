const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getMatchedJobs } = require("../controllers/jobController");

// Protected Route: Get Real Live Matched Jobs
router.get("/matched", protect, getMatchedJobs);

module.exports = router;
