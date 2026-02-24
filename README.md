# Router-Based Time-Limited Attendance System

This repository now contains the implementation blueprint for a secure attendance platform that combines:

- **Time-limited attendance windows** (default 5 minutes)
- **Router/LAN validation** (not SSID-only trust)
- **JWT authentication + role-based access**
- **Device binding** to reduce proxy attendance

## Included in this commit

- Solution architecture summary
- Backend-oriented folder structure blueprint
- Versioned REST API contract (request/response + validation/error model)

## Next implementation phase

1. Bootstrap Node.js + Express backend from the blueprint.
2. Add MongoDB models and indexes from API contract constraints.
3. Implement auth/session/attendance routes with middleware.
4. Add React Native app screens and network validation utilities.
