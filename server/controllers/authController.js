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

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate Random Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save Token in DB
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save();

    // Reset Link (supports mobile/network IP via process.env.CLIENT_URL or request origin)
    const baseUrl = process.env.CLIENT_URL || req.headers.origin || "http://localhost:5173";
    const resetLink = `${baseUrl}/reset-password/${resetToken}`;
    console.log(`🔑 Password Reset Link for ${user.email}: ${resetLink}`);

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      setImmediate(() => {
        try {
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            connectionTimeout: 3000,
            greetingTimeout: 3000,
            socketTimeout: 3000,
            auth: {
              user: process.env.EMAIL_USER.trim(),
              pass: process.env.EMAIL_PASS.trim(),
            },
          });

          transporter
            .sendMail({
              from: process.env.EMAIL_USER.trim(),
              to: user.email,
              subject: "PrepPilot Password Reset 🔑",
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #07050e; color: #ffffff; border-radius: 12px;">
                  <h2 style="color: #a855f7;">PrepPilot AI Password Reset</h2>
                  <p>Hello ${user.name || 'User'},</p>
                  <p>You requested a password reset for your PrepPilot AI account.</p>
                  <p style="margin: 20px 0;">
                    <a href="${resetLink}" style="padding: 12px 24px; background: linear-gradient(90deg, #a855f7, #ec4899); color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">Reset My Password</a>
                  </p>
                  <p style="color: #9ca3af; font-size: 12px;">This link will expire in 15 minutes.</p>
                </div>
              `,
            })
            .then(() => console.log(`📧 Reset email delivered to ${user.email}`))
            .catch((mailErr) => console.error("Nodemailer Email Error:", mailErr.message));
        } catch (mailSetupErr) {
          console.error("Nodemailer Setup Error:", mailSetupErr.message);
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: `Password reset link sent to ${user.email}!`,
      resetLink,
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({
      message: "Server Error processing password reset request",
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