import { Attendance } from './attendance.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { calculateAttendance } from "../../utils/attendance.util.js";

const normalizeDate = (value) => {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const buildAttendanceFilter = ({ employeeId, from, to }) => {
  const filter = {};
  if (employeeId) filter.employee = employeeId;

  const normalizedFrom = normalizeDate(from);
  const normalizedTo = normalizeDate(to);

  if (normalizedFrom || normalizedTo) {
    filter.date = {};
    if (normalizedFrom) filter.date.$gte = normalizedFrom;
    if (normalizedTo) filter.date.$lte = normalizedTo;
  }

  return filter;
};

const formatAttendance = (attendance) => ({
  id: attendance._id?.toString(),
  employee: attendance.employee,
  date: attendance.date,
  checkIn: attendance.checkIn,
  checkOut: attendance.checkOut,
  status: attendance.status,
  remarks: attendance.remarks,
  workingHours: attendance.workingHours,
  late: attendance.late,
  earlyLeave: attendance.earlyLeave,
  isAutoCheckout: attendance.isAutoCheckout,
  createdBy: attendance.createdBy,
  updatedBy: attendance.updatedBy,
  createdAt: attendance.createdAt,
  updatedAt: attendance.updatedAt,
});

export const getTodayAttendance = async (userId) => {
  const date = normalizeDate(new Date());
  const attendance = await Attendance.findOne({ employee: userId, date });
  return attendance ? formatAttendance(attendance) : null;
};

export const checkInToday = async (userId, isAutoCheckout = false) => {
  const date = normalizeDate(new Date());
  let attendance = await Attendance.findOne({ employee: userId, date });

  if (attendance?.checkIn) {
    throw new ApiError(409, 'Already checked in for today');
  }

  if (!attendance) {
    attendance = new Attendance({
      employee: userId,
      date,
      createdBy: userId,
      isAutoCheckout,
    });
  } else {
    attendance.isAutoCheckout = isAutoCheckout;
  }

  attendance.checkIn = new Date();

  const result = calculateAttendance({
    checkIn: attendance.checkIn,
    checkOut: attendance.checkOut,
    isAutoCheckout: attendance.isAutoCheckout,
  });

  attendance.status = result.status;
  attendance.workingHours = result.workingHours;
  attendance.late = result.late;
  attendance.earlyLeave = result.earlyLeave;

  await attendance.save();
  return formatAttendance(attendance);
};

export const checkOutToday = async (userId, isAutoCheckout = false) => {
  const date = normalizeDate(new Date());
  const attendance = await Attendance.findOne({ employee: userId, date });

  if (!attendance || !attendance.checkIn) {
    throw new ApiError(400, 'Cannot check out without a check-in');
  }

  if (attendance.checkOut) {
    throw new ApiError(409, 'Already checked out for today');
  }

  attendance.checkOut = new Date();
  attendance.isAutoCheckout = isAutoCheckout;

  const result = calculateAttendance({
    checkIn: attendance.checkIn,
    checkOut: attendance.checkOut,
    isAutoCheckout: attendance.isAutoCheckout,
  });

  attendance.status = result.status;
  attendance.workingHours = result.workingHours;
  attendance.late = result.late;
  attendance.earlyLeave = result.earlyLeave;

  await attendance.save();
  return formatAttendance(attendance);
};

export const recordAttendance = async (attendanceData, createdBy) => {
  const date = normalizeDate(attendanceData.date || new Date());

  const existing = await Attendance.findOne({
    employee: attendanceData.employeeId,
    date,
  });

  if (existing) {
    throw new ApiError(409, 'Attendance already recorded for this date');
  }

  // 🔥 Calculate logic
  const result = calculateAttendance({
    checkIn: attendanceData.checkIn,
    checkOut: attendanceData.checkOut,
    isAutoCheckout: attendanceData.isAutoCheckout,
  });

  const attendance = await Attendance.create({
    employee: attendanceData.employeeId,
    date,
    checkIn: attendanceData.checkIn,
    checkOut: attendanceData.checkOut,
    status: result.status,
    remarks: attendanceData.remarks,
    createdBy,
    isAutoCheckout: attendanceData.isAutoCheckout ?? false,
    workingHours: result.workingHours,
    late: result.late,
    earlyLeave: result.earlyLeave,
  });

  return formatAttendance(attendance);
};

export const listAttendances = async ({ employeeId, from, to, page, limit }) => {
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 20;
  const skip = (pageNum - 1) * limitNum;
  const filter = buildAttendanceFilter({ employeeId, from, to });

  const [attendances, total] = await Promise.all([
    Attendance.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum),
    Attendance.countDocuments(filter),
  ]);

  return {
    attendances: attendances.map(formatAttendance),
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  };
};

export const getAttendanceById = async (id) => {
  const attendance = await Attendance.findById(id);
  if (!attendance) {
    throw new ApiError(404, 'Attendance record not found');
  }
  return formatAttendance(attendance);
};

export const updateAttendance = async (id, updates, updatedBy) => {
  const attendance = await Attendance.findById(id);

  if (!attendance) {
    throw new ApiError(404, "Attendance record not found");
  }

  // ✅ Handle date update with duplicate check
  if (updates.date) {
    const normalizedDate = normalizeDate(updates.date);

    const duplicate = await Attendance.findOne({
      employee: attendance.employee,
      date: normalizedDate,
      _id: { $ne: attendance._id },
    });

    if (duplicate) {
      throw new ApiError(
        409,
        "Another attendance record already exists for this date"
      );
    }

    attendance.date = normalizedDate;
  }

  // ✅ Update fields safely
  if (updates.checkIn !== undefined) {
    attendance.checkIn = updates.checkIn;
  }

  if (updates.checkOut !== undefined) {
    attendance.checkOut = updates.checkOut;
  }

  if (updates.remarks !== undefined) {
    attendance.remarks = updates.remarks;
  }

  // ❌ DO NOT trust frontend status
  // if (updates.status !== undefined) attendance.status = updates.status;

  // 🔥 MAIN LOGIC (THIS IS WHAT YOU WERE ASKING)
  if (updates.isAutoCheckout !== undefined) {
    attendance.isAutoCheckout = updates.isAutoCheckout;
  }

  const result = calculateAttendance({
    checkIn: attendance.checkIn,
    checkOut: attendance.checkOut,
    isAutoCheckout: attendance.isAutoCheckout,
  });

  attendance.status = result.status;
  attendance.workingHours = result.workingHours;
  attendance.late = result.late;
  attendance.earlyLeave = result.earlyLeave;

  // ✅ audit
  if (updatedBy) {
    attendance.updatedBy = updatedBy;
  }

  await attendance.save();

  return formatAttendance(attendance);
};

export const deleteAttendance = async (id) => {
  const attendance = await Attendance.findByIdAndDelete(id);
  if (!attendance) {
    throw new ApiError(404, 'Attendance record not found');
  }
  return { id: attendance._id?.toString() };
};
