import * as authService from './auth.service.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const register = catchAsync(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, result, 'User registered successfully'));
});

export const login = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body, res);
  res.status(200).json(new ApiResponse(200, result, 'User logged in successfully'));
});

export const getMe = catchAsync(async (req, res) => {
  const result = await authService.getCurrentUser(req.user.id);
  res.status(200).json(new ApiResponse(200, result, 'Current user retrieved'));
});

export const logout = catchAsync(async (req, res) => {
  const result = await authService.logoutUser(res);
  res.status(200).json(new ApiResponse(200, result, 'User logged out successfully'));
});

export const forgetPassword = catchAsync(async (req, res) => {
  const result = await authService.forgetPassword(req.body);
  res.status(200).json(new ApiResponse(200, result, 'Password reset link sent successfully'));
});

export const resetPassword = catchAsync(async (req, res) => {
  // console.log(": RESET PASSWORD REQ", req.body)
  const result = await authService.resetPassword(req.body);
  res.status(200).json(new ApiResponse(200, result, 'Password reset successfully'));
});


