# Mobile App (Expo)

This is an **Expo React Native app** inside `apps/mobile`, compatible with the Node/Express backend in `apps/backend`.

## 1) Install dependencies (latest Expo)

From `apps/mobile`:

```powershell
npm install
```

> Note: this repo uses `expo: latest` so npm will install the newest Expo SDK available in your environment.

## 2) Run Expo

```powershell
npm run start
```

Then:
- press `a` to open Android emulator, or
- scan QR using **Expo Go** on your phone.

## 3) Configure backend URL

Set backend URL before starting Expo:

```powershell
$env:EXPO_PUBLIC_API_BASE_URL="http://192.168.1.10:4000/api/v1"
npm run start
```

For Android emulator, commonly:

```powershell
$env:EXPO_PUBLIC_API_BASE_URL="http://10.0.2.2:4000/api/v1"
```

The app falls back to `http://localhost:4000/api/v1` if env var is not provided.

## 4) Optional compatibility alignment

If Expo warns about mismatched packages after install:

```powershell
npx expo install --fix
```
