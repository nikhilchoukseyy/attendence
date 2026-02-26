import { getStoredDeviceId, setStoredDeviceId } from './authStorage';

function createUuidLike() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function getDeviceId() {
  const existing = await getStoredDeviceId();
  if (existing) return existing;
  const generated = createUuidLike();
  await setStoredDeviceId(generated);
  return generated;
}
