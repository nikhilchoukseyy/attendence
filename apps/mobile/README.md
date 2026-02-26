# Mobile App (Expo)

This is an **Expo React Native app** inside `apps/mobile`, compatible with the Node/Express backend in `apps/backend`.

## 1) Install dependencies (Expo (pinned compatible versions))

From `apps/mobile`:

```powershell
npm install
```

> Note: this repo pins Expo/React/React Native to compatible versions to avoid React renderer mismatch errors.

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


## 5) Fix: "Incompatible React versions"

If you see:

- `react` and `react-native-renderer` version mismatch
- `TypeError: Cannot read property "default" of undefined`

clean and reinstall inside `apps/mobile`:

```powershell
rm -r -fo node_modules
rm package-lock.json
npm cache verify
npm install
npx expo install --fix
npm run start -- --clear
```


## 6) Auto backend detection

The app now auto-detects your Expo host IP and uses `http://<expo-host-ip>:4000/api/v1` by default.
If needed, override manually with `EXPO_PUBLIC_API_BASE_URL`.
