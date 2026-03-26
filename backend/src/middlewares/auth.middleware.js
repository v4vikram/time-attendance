import jwt from 'jsonwebtoken';
import { User } from '../modules/auth/auth.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';

export const protect = catchAsync(async (req, res, next) => {
  // 🍪 Get token from cookie instead of headers
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, 'Not authorized to access this route');
  }

  // 🔐 Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired token');
  }

  // 👤 Get user
  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    throw new ApiError(401, 'The user belonging to this token no longer exists.');
  }

  req.user = user;

  next();
});