import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'attendance_token';
const USER_KEY = 'attendance_user';
const DEVICE_KEY = 'attendance_device_id';

export async function saveSession(token, user) {
  await AsyncStorage.multiSet([[TOKEN_KEY, token], [USER_KEY, JSON.stringify(user)]]);
}

export async function loadToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function loadUser() {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function clearSession() {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
}

export async function getStoredDeviceId() {
  return AsyncStorage.getItem(DEVICE_KEY);
}

export async function setStoredDeviceId(id) {
  await AsyncStorage.setItem(DEVICE_KEY, id);
}
