import jwt from 'jsonwebtoken';
import { User } from '../modules/auth/auth.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized to access this route');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    throw new ApiError(401, 'The user belonging to this token no longer exists.');
  }

  next();
});
