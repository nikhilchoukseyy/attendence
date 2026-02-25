import api from './client';

export function markAttendance(payload) {
  return api.post('/attendance/mark', payload);
}

export function getSessionAttendance(sessionId) {
  return api.get(`/attendance/session/${sessionId}`);
}
