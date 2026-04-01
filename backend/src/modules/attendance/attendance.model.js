import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    checkIn: Date,
    checkOut: Date,
    activeSince: Date,
    lastActivity: Date,
    totalActiveMinutes: {
      type: Number,
      default: 0,
    },
    isPaused: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        'present',
        'absent',
        'half_day',
        'on_leave',
        'remote',
        'holiday',
        'weekend',
        'pending',
        'invalid',
      ],
      default: 'present',
    },

    workingHours: Number,

    isAutoCheckout: {
      type: Boolean,
      default: false,
    },
    late: {
      type: Boolean,
      default: false,
    },
    earlyLeave: {
      type: Boolean,
      default: false,
    },

    remarks: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Unique attendance per day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

// Performance indexes
attendanceSchema.index({ date: 1 });
attendanceSchema.index({ employee: 1 });

// Validation + calculation
// attendanceSchema.pre('save', function (next) {
//   if (this.checkIn && this.checkOut && this.checkOut < this.checkIn) {
//     return next(new Error('Check-out cannot be before check-in'));
//   }

//   if (this.checkIn && this.checkOut) {
//     this.workingHours =
//       (this.checkOut - this.checkIn) / (1000 * 60 * 60);
//   }

//   next();
// });

export const Attendance = mongoose.model('Attendance', attendanceSchema);