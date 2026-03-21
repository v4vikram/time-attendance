import { User } from './auth.model.js';
import { generateToken } from '../../utils/jwt.js';
import { ApiError } from '../../utils/ApiError.js';

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

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user._id);

  const userResponse = user.toObject();
  delete userResponse.password;

  return { user: userResponse, token };
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return { user };
};
