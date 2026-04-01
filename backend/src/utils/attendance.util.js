import { config } from "../config/env.js";

export const calculateAttendance = ({
  checkIn,
  checkOut,
  isAutoCheckout = false, // 🔥 important
  totalActiveMinutes,
}) => {
  // ❌ No check-in
  if (!checkIn) {
    return {
      status: "absent",
      workingHours: 0,
      late: false,
      earlyLeave: false,
    };
  }

  // ⏳ No checkout yet
  if (!checkOut) {
    return {
      status: "pending",
      workingHours: 0,
      late: false,
      earlyLeave: false,
    };
  }

  const checkInTime = new Date(checkIn);
  const checkOutTime = new Date(checkOut);

  // ❌ Invalid case (checkout before checkin)
  if (checkOutTime <= checkInTime) {
    return {
      status: "invalid",
      workingHours: 0,
      late: false,
      earlyLeave: false,
    };
  }

  // ⏱ Working hours
  let workingHours = totalActiveMinutes !== undefined 
    ? totalActiveMinutes / 60 
    : (checkOutTime - checkInTime) / (1000 * 60 * 60);

  // 🔒 Prevent fake full-day via auto-checkout
  if (isAutoCheckout) {
    // cap hours OR restrict status
    workingHours = Math.min(
      workingHours,
      config.attendance.fullDayHours
    );
  }

  // ⏰ Late check
  const [lateHour, lateMin] = config.attendance.lateAfter.split(":");
  const lateTime = new Date(checkInTime);
  lateTime.setHours(lateHour, lateMin, 0);

  const isLate = checkInTime > lateTime;

  // ⏰ Early leave
  const [endHour, endMin] = config.attendance.officeEnd.split(":");
  const endTime = new Date(checkOutTime);
  endTime.setHours(endHour, endMin, 0);

  const isEarlyLeave = checkOutTime < endTime;

  // 📊 Status logic (main)
  let status = "absent";

  if (isAutoCheckout) {
    // ❌ never give full day on auto
    if (workingHours >= config.attendance.halfDayHours) {
      status = "half_day";
    } else {
      status = "absent";
    }
  } else {
    if (workingHours >= config.attendance.fullDayHours) {
      status = "present";
    } else if (workingHours >= config.attendance.halfDayHours) {
      status = "half_day";
    }
  }

  return {
    status,
    workingHours: Number(workingHours.toFixed(2)),
    late: isLate,
    earlyLeave: isEarlyLeave,
  };
};