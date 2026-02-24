# Mobile App (Expo)

This project now uses **Expo managed workflow** (no Android Studio native project required for preview).

## Run with Expo Go

From `apps/mobile`:

```powershell
npm install
npx expo start
```

Then:
- press `a` to open Android emulator (if configured), or
- scan the QR code in **Expo Go** on your phone.

## Useful commands

```powershell
npm run start
npm run android
npm run ios
npm run web
```

## If you see dependency/version warnings

```powershell
npx expo install --fix
```

## Backend URL note

If Expo app cannot reach local backend on `localhost`, set API base URL in
`src/api/client.js` to your machine LAN IP (for physical device) or emulator-reachable host.
