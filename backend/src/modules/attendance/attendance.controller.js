import * as attendanceService from './attendance.service.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const createAttendance = catchAsync(async (req, res) => {
  console.log(": CREATE ATTENDANCE REQ", req.body, req.user);
  const result = await attendanceService.recordAttendance(req.body, req.user._id);
  res.status(201).json(new ApiResponse(201, result, 'Attendance created successfully'));
});

export const listAttendances = catchAsync(async (req, res) => {
  const result = await attendanceService.listAttendances(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Attendance records retrieved successfully'));
});

export const getAttendance = catchAsync(async (req, res) => {
  const result = await attendanceService.getAttendanceById(req.params.id);
  res.status(200).json(new ApiResponse(200, result, 'Attendance record retrieved successfully'));
});

export const getTodayAttendance = catchAsync(async (req, res) => {
  const result = await attendanceService.getTodayAttendance(req.user._id);
  res.status(200).json(new ApiResponse(200, result, 'Today attendance retrieved successfully'));
});

export const checkInToday = catchAsync(async (req, res) => {
  const result = await attendanceService.checkInToday(req.user._id, req.body.isAutoCheckout || false);
  res.status(200).json(new ApiResponse(200, result, 'Checked in successfully'));
});

export const checkOutToday = catchAsync(async (req, res) => {
  const result = await attendanceService.checkOutToday(req.user._id, req.body.isAutoCheckout || false);
  res.status(200).json(new ApiResponse(200, result, 'Checked out successfully'));
});

export const updateAttendance = catchAsync(async (req, res) => {
  const result = await attendanceService.updateAttendance(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, result, 'Attendance record updated successfully'));
});

export const deleteAttendance = catchAsync(async (req, res) => {
  const result = await attendanceService.deleteAttendance(req.params.id);
  res.status(200).json(new ApiResponse(200, result, 'Attendance record deleted successfully'));
});
