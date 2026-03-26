import * as employeesService from './employees.service.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const createEmployee = catchAsync(async (req, res) => {
  const result = await employeesService.createEmployee(req.body);
  res.status(201).json(new ApiResponse(201, result, 'Employee created successfully'));
});

export const getEmployees = catchAsync(async (req, res) => {
  const result = await employeesService.listEmployees(req.query);
  res.status(200).json(new ApiResponse(200, result, 'Employees retrieved successfully'));
});

export const getEmployeeById = catchAsync(async (req, res) => {
  const result = await employeesService.getEmployeeById(req.params.id);
  res.status(200).json(new ApiResponse(200, result, 'Employee retrieved successfully'));
});

export const updateEmployee = catchAsync(async (req, res) => {
  const result = await employeesService.updateEmployee(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, result, 'Employee updated successfully'));
});

export const deleteEmployee = catchAsync(async (req, res) => {
  const result = await employeesService.deleteEmployee(req.params.id);
  res.status(200).json(new ApiResponse(200, result, 'Employee deactivated successfully'));
});

