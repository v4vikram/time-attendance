import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://time-attendance:t1Z266bXRA9u740p@cluster0.bo19t.mongodb.net/time-attendance?appName=Cluster0",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "supersecret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  emailHost: process.env.EMAIL_HOST || "smtp.gmail.com",
  emailPort: process.env.EMAIL_PORT || 587,
  emailUser: process.env.EMAIL_USER || "v4vikram.dev@gmail.com",
  emailPass: process.env.EMAIL_PASS || "your-password",

attendance: {
  // 🕒 Office timings
  officeStart: process.env.OFFICE_START || "09:00",
  officeEnd: process.env.OFFICE_END || "18:00",

  // ⏱ Work hours rules
  fullDayHours: Number(process.env.FULL_DAY_HOURS) || 8,
  halfDayHours: Number(process.env.HALF_DAY_HOURS) || 4.5,
  minWorkHours: Number(process.env.MIN_WORK_HOURS) || 4, // below this = absent

  // ⏰ Late & grace
  lateAfter: process.env.LATE_AFTER || "09:30",
  graceMinutes: Number(process.env.GRACE_MINUTES) || 15,

  // 🔁 Auto handling
  autoCheckoutTime: process.env.AUTO_CHECKOUT_TIME || "18:30",
  allowAutoCheckout: true,
  markAbsentIfNoCheckout: false, // else calculate based on hours

  // 🚫 Restrictions
  allowMultipleCheckIn: false,
  allowCheckoutWithoutCheckIn: false,
  allowCheckInAfterCheckout: false,

  // ⚠️ Edge case handling
  markInvalidIfCheckoutBeforeCheckIn: true,
  roundOffWorkHours: true, // round to nearest 0.5 or 1 hour
  minimumCheckoutGapMinutes: 30, // prevent instant check-in/out abuse

  // 🌐 Failure handling (light/internet gone)
  allowOfflineCheckIn: true,
  retrySyncAttempts: 3,

  // 📍 Optional advanced
  enableGeoFencing: false,
  allowedRadiusMeters: 100,

  // 📝 Admin controls
  allowManualOverride: true,
  requireRemarkForOverride: true,
}
};
