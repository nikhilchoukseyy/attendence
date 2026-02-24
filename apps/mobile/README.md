# Mobile App Troubleshooting (Windows)

If `npm start` or `npm run android` says **Missing script**, your local `package.json`
likely does not contain the expected scripts.

## 1) Verify scripts

```powershell
npm run
```

You should see:

- `start`
- `android`

## 2) Fix scripts quickly

Run this from `apps/mobile`:

```powershell
npm pkg set scripts.start="react-native start"
npm pkg set scripts.android="react-native run-android"
```

Then retry:

```powershell
npm start
npm run android
```

## 3) If Android still fails

- Ensure Android Studio + SDK + emulator are installed.
- Run `npx react-native doctor` and fix reported issues.
- In a second terminal, keep Metro running while executing `npm run android`.
- If backend is on host machine and emulator cannot hit `localhost`, use `10.0.2.2` in `src/api/client.js`.


## 4) If Metro says "No Metro config found"

Run from `apps/mobile`:

```powershell
node scripts/ensure-rn-files.js
npm start
```

`npm start` now uses an explicit config path (`--config metro.config.js`) and auto-creates missing RN root files if they were deleted accidentally.
