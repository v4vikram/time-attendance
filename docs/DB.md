# 📊 Time & Attendance System - Database Design

## 🧠 Overview

This document describes the database design for a Time & Attendance system built using MongoDB (MERN stack). The design follows normalization, scalability, and real-world production practices.

---

# 🗄️ Collections Overview

* Users
* Attendance
* Leaves
* Departments
* Shifts
* Holidays (optional)

---

# 👤 Users Collection

```json
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  role: "admin" | "employee",
  departmentId: ObjectId,
  shiftId: ObjectId,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

* email (unique)
* departmentId

---

# 🏢 Departments Collection

```json
{
  _id: ObjectId,
  name: String,
  description: String,
  createdAt: Date
}
```

---

# ⏱️ Shifts Collection

```json
{
  _id: ObjectId,
  name: String,
  startTime: "HH:mm",
  endTime: "HH:mm",
  lateAfter: "HH:mm",
  createdAt: Date
}
```

---

# 📅 Attendance Collection

```json
{
  _id: ObjectId,
  userId: ObjectId,
  date: String,
  checkInTime: Date,
  checkOutTime: Date,
  totalHours: Number,
  status: "present" | "absent" | "late" | "half-day",
  isManual: Boolean,
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Critical Index

* Compound unique index on (userId, date)

---

# 📝 Leaves Collection

```json
{
  _id: ObjectId,
  userId: ObjectId,
  fromDate: Date,
  toDate: Date,
  type: "sick" | "casual" | "paid",
  reason: String,
  status: "pending" | "approved" | "rejected",
  approvedBy: ObjectId,
  approvedAt: Date,
  createdAt: Date
}
```

---

# 🎉 Holidays Collection (Optional)

```json
{
  _id: ObjectId,
  date: Date,
  title: String,
  description: String
}
```

---

# 🔁 Relationships

* User belongs to Department
* User belongs to Shift
* User has many Attendance records
* User has many Leaves

---

# ⚙️ Business Rules

* One attendance record per user per day
* Check-out must occur after check-in
* Leave requests require admin approval
* Late marking based on shift timing

---

# 📊 Example Queries

## Get Today Attendance

```js
find({ userId, date: today })
```

## Monthly Total Hours

```js
aggregate([
  { $match: { userId } },
  { $group: { _id: "$userId", totalHours: { $sum: "$totalHours" } } }
])
```

---

# ⚡ Performance Considerations

* Index on userId + date
* Index on status
* Use pagination for large datasets
* Avoid full collection scans

---

# 🔐 Data Integrity

* Prevent duplicate attendance using unique index
* Validate check-in/check-out flow
* Avoid overlapping leaves (optional validation)

---

# 🚀 Future Enhancements

* Multi-branch/company support
* Payroll integration
* Real-time tracking (WebSockets)
* Analytics dashboards

---

# 🧠 Interview Explanation

"The database is designed using normalized collections with reference-based relations. A compound unique index ensures one attendance per user per day. Shift-based logic enables dynamic late marking and working hour calculations."

---

# ✅ Conclusion

This database design is scalable, optimized, and production-ready for a Time & Attendance system using MongoDB.
