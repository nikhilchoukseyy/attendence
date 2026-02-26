# Folder Structure Blueprint

A practical mono-repo structure for the attendance system.

```text
attendence/
├─ apps/
│  ├─ mobile/                         # React Native app
│  │  ├─ src/
│  │  │  ├─ api/
│  │  │  │  ├─ client.ts              # Axios instance + interceptors
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ session.ts
│  │  │  │  └─ attendance.ts
│  │  │  ├─ screens/
│  │  │  │  ├─ LoginScreen.tsx
│  │  │  │  ├─ RegisterScreen.tsx
│  │  │  │  ├─ TeacherDashboard.tsx
│  │  │  │  └─ StudentDashboard.tsx
│  │  │  ├─ services/
│  │  │  │  ├─ authStorage.ts         # AsyncStorage helpers
│  │  │  │  ├─ deviceIdentity.ts      # Stable device ID (UUID/device-info)
│  │  │  │  └─ networkValidation.ts   # WiFi/gateway/subnet checks
│  │  │  ├─ state/
│  │  │  │  └─ authStore.ts
│  │  │  ├─ types/
│  │  │  │  └─ api.ts
│  │  │  └─ utils/
│  │  └─ package.json
│  │
│  └─ backend/                        # Node.js + Express API
│     ├─ src/
│     │  ├─ config/
│     │  │  ├─ env.ts
│     │  │  ├─ db.ts
│     │  │  └─ constants.ts
│     │  ├─ models/
│     │  │  ├─ User.ts
│     │  │  ├─ Session.ts
│     │  │  └─ Attendance.ts
│     │  ├─ routes/
│     │  │  ├─ auth.routes.ts
│     │  │  ├─ session.routes.ts
│     │  │  └─ attendance.routes.ts
│     │  ├─ controllers/
│     │  │  ├─ auth.controller.ts
│     │  │  ├─ session.controller.ts
│     │  │  └─ attendance.controller.ts
│     │  ├─ services/
│     │  │  ├─ auth.service.ts
│     │  │  ├─ session.service.ts
│     │  │  ├─ attendance.service.ts
│     │  │  └─ subnet.service.ts
│     │  ├─ middleware/
│     │  │  ├─ authJwt.ts
│     │  │  ├─ requireRole.ts
│     │  │  ├─ deviceBinding.ts
│     │  │  └─ errorHandler.ts
│     │  ├─ validators/
│     │  │  ├─ auth.validator.ts
│     │  │  ├─ session.validator.ts
│     │  │  └─ attendance.validator.ts
│     │  ├─ utils/
│     │  │  ├─ jwt.ts
│     │  │  ├─ time.ts
│     │  │  └─ ip.ts
│     │  ├─ app.ts
│     │  └─ server.ts
│     ├─ tests/
│     │  ├─ integration/
│     │  └─ unit/
│     ├─ package.json
│     └─ tsconfig.json
│
├─ docs/
│  ├─ folder-structure-blueprint.md
│  └─ api-contract.md
├─ .editorconfig
├─ .gitignore
└─ README.md
```

## Design Notes

- Keep business logic in `services/`; controllers should remain thin.
- Enforce all security checks server-side even if mobile validates first.
- Use unique DB index on attendance: `{ student_id: 1, session_id: 1 }`.
- Add index on sessions for active lookup: `{ active: 1, end_time: 1 }`.
