const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadResume,
  analyzeResume,
  getUserResumes,
  deleteResume,
} = require("../controllers/resumeController");

// Resume API Routes
router.post("/upload", protect, upload.single("resume"), uploadResume);
router.post("/analyze", protect, analyzeResume);
router.post("/analyze/:id", protect, analyzeResume);
router.get("/my-resumes", protect, getUserResumes);
router.delete("/:id", protect, deleteResume);

module.exports = router;
