const Session = require('../models/Session');
const { DEFAULT_SESSION_MINUTES } = require('../config/env');

async function expireOldSessions() {
  const now = new Date();
  await Session.updateMany({ active: true, end_time: { $lt: now } }, { active: false });
}

async function startSession(req, res) {
  const { router_ip, duration_minutes } = req.body;
  if (!router_ip) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'router_ip is required' } });
  }

  const now = new Date();
  const minutes = Number(duration_minutes) || DEFAULT_SESSION_MINUTES;
  const end = new Date(now.getTime() + minutes * 60 * 1000);

  const session = await Session.create({
    teacher_id: req.user.id,
    router_ip,
    start_time: now,
    end_time: end,
    active: true
  });

  return res.status(201).json({ session });
}

async function getActiveSession(req, res) {
  await expireOldSessions();
  const session = await Session.findOne({ active: true }).sort({ start_time: -1 });
  if (!session) return res.status(404).json({ error: { code: 'SESSION_NOT_ACTIVE', message: 'No active session' } });
  return res.json({ session });
}

module.exports = { startSession, getActiveSession, expireOldSessions };
