# 📡 Time & Attendance System - API Design (Production Ready)

## 🧠 Overview
This document defines all REST API endpoints for the Time & Attendance system.
It follows a scalable, consistent, and AI-safe structure.

---

# 🔒 API RULES (STRICT)

- All APIs must start with: /api/v1
- All responses must follow:
  { success: boolean, data?: any, message?: string }
- All protected routes require:
  Authorization: Bearer <token>
- Use Zod validation for ALL inputs
- Use pagination for list APIs
- No business logic inside controllers (use service layer)

---

# 🔐 Authentication APIs

## Register User
POST /api/v1/auth/register

## Login
POST /api/v1/auth/login

## Get Current User
GET /api/v1/auth/me

---

# 👤 User APIs (Admin)

## Get All Users
GET /api/v1/users?page=1&limit=10

## Get Single User
GET /api/v1/users/:id

## Update User
PUT /api/v1/users/:id

## Delete User
DELETE /api/v1/users/:id

---

# ⏱️ Attendance APIs

## Check-In
POST /api/v1/attendance/check-in

## Check-Out
POST /api/v1/attendance/check-out

## Get My Attendance
GET /api/v1/attendance/me?month=3&year=2026

## Get Attendance by User (Admin)
GET /api/v1/attendance/user/:userId

## Get All Attendance (Admin)
GET /api/v1/attendance?page=1&limit=10&date=2026-03-20

---

# 📝 Leave APIs

## Apply Leave
POST /api/v1/leave

## Get My Leaves
GET /api/v1/leave/me

## Get All Leaves (Admin)
GET /api/v1/leave?page=1&limit=10

## Approve/Reject Leave
PUT /api/v1/leave/:id

---

# 🏢 Department APIs

## Create Department
POST /api/v1/departments

## Get All Departments
GET /api/v1/departments

## Update Department
PUT /api/v1/departments/:id

## Delete Department
DELETE /api/v1/departments/:id

---

# ⏱️ Shift APIs

## Create Shift
POST /api/v1/shifts

## Get All Shifts
GET /api/v1/shifts

## Update Shift
PUT /api/v1/shifts/:id

## Delete Shift
DELETE /api/v1/shifts/:id

---

# 🎉 Holiday APIs

## Create Holiday
POST /api/v1/holidays

## Get Holidays
GET /api/v1/holidays

---

# 📊 Reports APIs

## Monthly Report
GET /api/v1/reports/monthly?userId=123&month=3&year=2026

---

# 🔐 STANDARD RESPONSE FORMAT

## ✅ Success
{
  "success": true,
  "data": {},
  "message": "Optional message"
}

## ❌ Error
{
  "success": false,
  "message": "Error message"
}

---

# 🤖 AI INSTRUCTION

- Do NOT create any API without /api/v1 prefix
- Do NOT return raw data (always wrap in success/data)
- Do NOT put business logic in controllers
- Always validate input using Zod
- Always use service layer

---

# 🚀 Conclusion

This API design is now:
- Versioned
- Consistent
- Scalable
- AI-safe
- Production-ready
