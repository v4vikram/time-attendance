```
backend/
│
├── src/
│   ├── modules/                # 🔥 Feature-based modules
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.validation.js
│   │   │
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.routes.js
│   │   │
│   │   ├── attendance/
│   │   │   ├── attendance.controller.js
│   │   │   ├── attendance.service.js
│   │   │   ├── attendance.routes.js
│   │   │   ├── attendance.helper.js
│   │   │
│   │   ├── leave/
│   │   │   ├── leave.controller.js
│   │   │   ├── leave.service.js
│   │   │   ├── leave.routes.js
│
│   ├── models/                 # DB Schemas
│   │   ├── user.model.js
│   │   ├── attendance.model.js
│   │   ├── leave.model.js
│
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── error.middleware.js
│
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── response.js
│   │   ├── date.js
│
│   ├── jobs/                   # Cron jobs
│   │   ├── attendance.job.js
│
│   ├── routes/                 # Central route loader
│   │   ├── index.js
│
│   ├── app.js                  # Express app
│   └── server.js               # Entry point
│
├── package.json
└── .env
```