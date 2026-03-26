import { User } from '../auth/auth.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const createEmployee = async (employeeData) => {
  const existing = await User.findOne({ email: employeeData.email });
  if (existing) {
    throw new ApiError(400, 'Employee already exists');
  }

  const employee = await User.create({
    ...employeeData,
    role: 'employee',
  });

  const employeeResponse = employee.toObject();
  delete employeeResponse.password;

  return { employee: employeeResponse };
};

export const listEmployees = async ({ page, limit, isActive }) => {
  const filter = { role: 'employee' };
  if (typeof isActive === 'boolean') filter.isActive = isActive;

  const skip = (page - 1) * limit;

  const [employees, total] = await Promise.all([
    User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  return {
    employees,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getEmployeeById = async (id) => {
  const employee = await User.findById(id).select('-password');
  if (!employee || employee.role !== 'employee') {
    throw new ApiError(404, 'Employee not found');
  }
  return { employee };
};

export const updateEmployee = async (id, updates) => {
  const existing = await User.findById(id).select('-password');
  if (!existing || existing.role !== 'employee') {
    throw new ApiError(404, 'Employee not found');
  }

  if (updates.email && updates.email !== existing.email) {
    const conflict = await User.findOne({ email: updates.email });
    if (conflict) throw new ApiError(400, 'Email already exists');
  }

  const updated = await User.findByIdAndUpdate(
    id,
    { $set: { ...updates, role: 'employee' } },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updated) throw new ApiError(404, 'Employee not found');
  return { employee: updated };
};

export const deleteEmployee = async (id) => {
  const updated = await User.findByIdAndUpdate(
    id,
    { $set: { isActive: false } },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updated || updated.role !== 'employee') {
    throw new ApiError(404, 'Employee not found');
  }

  return { employee: updated, message: 'Employee deactivated successfully' };
};

