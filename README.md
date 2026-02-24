# Router-Based Time-Limited Attendance System

A full-stack attendance system with:

- Expo React Native mobile app (`apps/mobile`)
- Node.js + Express backend (`apps/backend`)
- MongoDB persistence
- JWT authentication
- Device binding
- Router/LAN subnet validation
- Time-bound attendance sessions (default 5 minutes)

## Project Structure

- `apps/backend`: REST API implementation
- `apps/mobile`: Expo managed mobile client app
- `docs/api-contract.md`: endpoint contract
- `docs/folder-structure-blueprint.md`: architecture layout

## Backend Quick Start

```bash
cd apps/backend
npm install
npm start
```

Environment variables (optional):

- `PORT` (default: `4000`)
- `MONGODB_URI` (default: `mongodb://127.0.0.1:27017/attendance`)
- `JWT_SECRET`
- `JWT_EXPIRES_IN` (default: `1d`)
- `DEFAULT_SESSION_MINUTES` (default: `5`)

## Mobile Quick Start (Expo)

```bash
cd apps/mobile
npm install
npm run start
```

Use Expo Go on your phone to scan the QR code, or press `a` to launch Android from Expo CLI.

If mobile cannot reach backend on `localhost`, update `apps/mobile/src/api/client.js` to your LAN IP.

## Implemented API Endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/session/start` (teacher)
- `GET /api/v1/session/active`
- `POST /api/v1/attendance/mark` (student)
- `GET /api/v1/attendance/session/:id` (teacher)
