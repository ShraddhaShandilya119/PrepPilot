const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'PrepPilotSecretKey',
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Server Error during registration",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found. Please register first.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials / password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'PrepPilotSecretKey',
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Server Error during login",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({
      message: "Server Error fetching profile",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server Error updating profile" });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || email.trim() === "") {
      return res.status(400).json({
        message: "Email address is required",
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(404).json({
        message: "No registered account found with this email. Please sign up first.",
      });
    }

    // Generate Secure Random Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save Token and 15-minute expiration in MongoDB
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const baseUrl = process.env.CLIENT_URL || req.headers.origin || "https://prep-pilot-pied.vercel.app";
    const resetLink = `${baseUrl}/reset-password/${resetToken}`;

    console.log(`🔑 Password Reset Link for ${user.email}: ${resetLink}`);

    // Optional Nodemailer attempt (Non-blocking)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      setImmediate(async () => {
        try {
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            connectionTimeout: 2000,
            greetingTimeout: 2000,
            socketTimeout: 2000,
            auth: {
              user: process.env.EMAIL_USER.trim(),
              pass: process.env.EMAIL_PASS.trim(),
            },
          });

          await transporter.sendMail({
            from: process.env.EMAIL_USER.trim(),
            to: user.email,
            subject: "PrepPilot AI Password Reset 🔑",
            html: `<div style="font-family:Arial;padding:20px;background:#07050e;color:#fff;border-radius:12px;"><h2 style="color:#a855f7;">PrepPilot AI</h2><p>Click to reset password:</p><a href="${resetLink}" style="padding:10px 20px;background:#a855f7;color:#fff;text-decoration:none;border-radius:8px;display:inline-block;">Reset Password</a></div>`,
          });
        } catch (e) {
          console.log("Optional mail notice:", e.message);
        }
      });
    }

    // Return Instant 200 Response
    return res.status(200).json({
      success: true,
      message: `Account verified! Reset token generated for ${user.email}`,
      resetToken,
      resetLink,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      message: "Server error generating reset token",
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "New password is required",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired password reset token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now log in.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({
      message: "Server Error resetting password",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // Hash and update new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({
      message: "Server Error changing password",
    });
  }
};

const updateTargetRole = async (req, res) => {
  try {
    const { targetRole } = req.body;

    if (!targetRole || typeof targetRole !== "string" || targetRole.trim() === "") {
      return res.status(400).json({
        message: "Target role is required",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.targetRole = targetRole.trim();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Target role updated successfully",
      targetRole: user.targetRole,
    });
  } catch (error) {
    console.error("Update Target Role Error:", error);
    res.status(500).json({
      message: "Server Error updating target role",
    });
  }
};

module.exports = {
  registerUser,
  login,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateTargetRole,
};