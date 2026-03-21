```
frontend/
│
├── src/
│   ├── app/                   # App-level setup
│   │   ├── store.js           # Redux (optional)
│   │   ├── router.jsx         # Routing config
│
│   ├── modules/               # 🔥 Feature-based modules
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   │   ├── auth.api.js
│   │   │   ├── hooks/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard.jsx
│   │   │   ├── components/
│   │   │
│   │   ├── attendance/
│   │   │   ├── pages/
│   │   │   │   ├── Attendance.jsx
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   │   ├── attendance.api.js
│   │   │   ├── hooks/
│   │   │
│   │   ├── leave/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── services/
│
│   ├── shared/                # Reusable across modules
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   ├── hooks/
│   │   ├── utils/
│   │   │   ├── apiClient.js
│   │   │   ├── constants.js
│
│   ├── context/               # Global state (Auth etc.)
│   │   ├── AuthContext.jsx
│
│   ├── styles/
│   │   ├── globals.css
│
│   ├── App.jsx
│   └── main.jsx
```