import { User } from './auth.model.js';
import { generateToken } from '../../utils/jwt.js';
import { ApiError } from '../../utils/ApiError.js';
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail.js";
import { config } from '../../config/env.js';

export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create(userData);

  const userResponse = user.toObject();
  delete userResponse.password;

  return { user: userResponse };
};

export const loginUser = async (body, res) => {
  const { email, password } = body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user._id);

  const userResponse = user.toObject();
  delete userResponse.password;

  // 🍪 Only set cookie here (NO response)
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return {userResponse, token};
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return { user };
};

export const logoutUser = async (res) => {
  res.clearCookie('accessToken');
  return { message: 'User logged out successfully' };
};



export const forgetPassword = async (body) => {
  const { email } = body;

  const user = await User.findOne({ email });

  // Prevent email enumeration
  if (!user) {
    return {
      message: "If the email exists, a reset link has been sent",
    };
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString("hex");
  console.log("RESET TOKEN:", resetToken, resetToken.length);

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await user.save();

  // Create reset URL
  const resetURL = `${config.frontendUrl}/reset-password/${resetToken}`;

  // Email HTML
  const html = `
    <h2>Password Reset</h2>
    <p>You requested to reset your password</p>
    <a href="${resetURL}" target="_blank">Reset Password</a>
    <p>This link will expire in 10 minutes</p>
  `;

  await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    html,
  });

  return {
    message: "If the email exists, a reset link has been sent",
  };
};

export const resetPassword = async (body) => {

  const { token, password } = body;

  // ✅ hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Token invalid or expired");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return { message: "Password reset successful" };
};
