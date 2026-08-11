const mongoose = require("mongoose");
const Bookmark = require("../models/Bookmark");

// @desc    Create a new bookmark
// @route   POST /api/bookmarks
// @access  Private
const createBookmark = async (req, res) => {
  try {
    const { type, title, content, source } = req.body;

    if (!type || !title || !content) {
      return res.status(400).json({
        success: false,
        message: "Type, title, and content are required",
      });
    }

    const validTypes = ["ai-answer", "interview-question", "resource"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bookmark type. Allowed: ai-answer, interview-question, resource",
      });
    }

    const userId = req.user._id || req.user.id;
    const bookmark = await Bookmark.create({
      user: userId,
      type,
      title: title.trim(),
      content: content.trim(),
      source: source ? source.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Bookmark saved successfully",
      bookmark,
    });
  } catch (error) {
    console.error("Create Bookmark Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error creating bookmark",
    });
  }
};

// @desc    Get all bookmarks for logged-in user
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const bookmarks = await Bookmark.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookmarks.length,
      bookmarks,
    });
  } catch (error) {
    console.error("Get Bookmarks Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error fetching bookmarks",
    });
  }
};

// @desc    Delete a bookmark by ID
// @route   DELETE /api/bookmarks/:id
// @access  Private
const deleteBookmark = async (req, res) => {
  try {
    const bookmarkId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookmarkId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bookmark ID format",
      });
    }

    const bookmark = await Bookmark.findById(bookmarkId);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    const userId = req.user._id ? req.user._id.toString() : req.user.id.toString();
    if (bookmark.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this bookmark",
      });
    }

    await bookmark.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    console.error("Delete Bookmark Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error deleting bookmark",
    });
  }
};

module.exports = {
  createBookmark,
  getBookmarks,
  deleteBookmark,
};
