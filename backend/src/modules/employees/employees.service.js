import { User } from '../auth/auth.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const createEmployee = async (employeeData) => {
  const existing = await User.findOne({ email: employeeData.email });
  if (existing) {
    throw new ApiError(400, 'Employee already exists');
  }

  const status = employeeData.status || 'Active';

  // Frontend "Add Employee" modal doesn't ask for password; generate a strong-ish one.
  // This enables the user to exist in auth system, even if they need a reset flow later.
  const generatedPassword =
    employeeData.password ||
    `Temp@${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;

  const employee = await User.create({
    ...employeeData,
    role: 'employee',
    password: generatedPassword,
    jobTitle: employeeData.role,
    departmentName: employeeData.department,
    employeeStatus: status,
    isActive: status === 'Active',
  });

  const employeeResponse = employee.toObject();
  delete employeeResponse.password;

  // Normalize response to match the frontend table fields.
  return {
    employee: {
      _id: employeeResponse._id,
      id: employeeResponse._id?.toString?.(),
      name: employeeResponse.name,
      email: employeeResponse.email,
      role: employeeResponse.jobTitle || '',
      department: employeeResponse.departmentName || '',
      status: employeeResponse.employeeStatus || 'Active',
      isActive: employeeResponse.isActive,
    },
  };

};

export const listEmployees = async ({ page, limit, isActive, q }) => {
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const filter = { role: 'employee' };
  const isActiveBool =
    typeof isActive === 'boolean'
      ? isActive
      : typeof isActive === 'string'
        ? isActive === 'true'
        : undefined;
  if (typeof isActiveBool === 'boolean') filter.isActive = isActiveBool;
  if (q && q.trim()) {
    const regex = new RegExp(q.trim(), 'i');
    filter.$or = [
      { name: regex },
      { email: regex },
      { jobTitle: regex },
      { departmentName: regex },
      { employeeStatus: regex },
    ];
  }

  const skip = (pageNum - 1) * limitNum;

  const [employees, total] = await Promise.all([
    User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    User.countDocuments(filter),
  ]);

  return {
    employees: employees.map((emp) => ({
      _id: emp._id,
      id: emp._id?.toString?.(),
      name: emp.name,
      email: emp.email,
      role: emp.jobTitle || '',
      department: emp.departmentName || '',
      status: emp.employeeStatus || 'Active',
      isActive: emp.isActive,
    })),
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  };
};

export const getEmployeeById = async (id) => {
  const employee = await User.findById(id).select('-password');
  if (!employee || employee.role !== 'employee') {
    throw new ApiError(404, 'Employee not found');
  }
  return {
    employee: {
      _id: employee._id,
      id: employee._id?.toString?.(),
      name: employee.name,
      email: employee.email,
      role: employee.jobTitle || '',
      department: employee.departmentName || '',
      status: employee.employeeStatus || 'Active',
      isActive: employee.isActive,
    },
  };
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

  const status = updates.status || existing.employeeStatus || 'Active';

  const updated = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        // Keep schema-safe updates only.
        name: updates.name,
        email: updates.email,
        password: updates.password,
        jobTitle: updates.role,
        departmentName: updates.department,
        employeeStatus: status,
        isActive: status === 'Active',
        role: 'employee',
      },
    },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updated) throw new ApiError(404, 'Employee not found');

  return {
    employee: {
      _id: updated._id,
      id: updated._id?.toString?.(),
      name: updated.name,
      email: updated.email,
      role: updated.jobTitle || '',
      department: updated.departmentName || '',
      status: updated.employeeStatus || 'Active',
      isActive: updated.isActive,
    },
  };
};

export const deleteEmployee = async (id) => {
  const updated = await User.findByIdAndUpdate(
    id,
    { $set: { isActive: false, employeeStatus: 'Offline', role: 'employee' } },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updated || updated.role !== 'employee') {
    throw new ApiError(404, 'Employee not found');
  }

  return {
    employee: {
      _id: updated._id,
      id: updated._id?.toString?.(),
      name: updated.name,
      email: updated.email,
      role: updated.jobTitle || '',
      department: updated.departmentName || '',
      status: updated.employeeStatus || 'Offline',
      isActive: updated.isActive,
    },
    message: 'Employee deactivated successfully',
  };
};

