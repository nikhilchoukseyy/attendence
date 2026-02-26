import api from './client';

export function startSession(payload) {
  return api.post('/session/start', payload);
}

export function getActiveSession() {
  return api.get('/session/active');
}
