export type AttendanceStatus =
  | "present"
  | "absent"
  | "half_day"
  | "pending"
  | "invalid"
  | "on_leave"
  | "remote";

export type AttendanceRecord = {
  id: string;
  employee: string;
  date: string;
  checkIn?: string | null;
  checkOut?: string | null;
  status: AttendanceStatus;
  remarks?: string;
  workingHours?: number;
  late?: boolean;
  earlyLeave?: boolean;
  isAutoCheckout?: boolean;
  isPaused?: boolean;
  totalActiveMinutes?: number;
  activeSince?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ListAttendanceParams = {
  page?: number;
  limit?: number;
  employeeId?: string;
  from?: string;
  to?: string;
};

export type ListAttendanceResponse = {
  attendances: AttendanceRecord[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CreateAttendanceInput = {
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  remarks?: string;
  isAutoCheckout?: boolean;
};

export type UpdateAttendanceInput = {
  id: string;
  date?: string;
  checkIn?: string;
  checkOut?: string;
  remarks?: string;
  isAutoCheckout?: boolean;
};
