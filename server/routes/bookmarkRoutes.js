const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createBookmark,
  getBookmarks,
  deleteBookmark,
} = require("../controllers/bookmarkController");

// All Bookmark routes are protected with authMiddleware
router.use(protect);

router.post("/", createBookmark);
router.get("/", getBookmarks);
router.delete("/:id", deleteBookmark);

module.exports = router;
