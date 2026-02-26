const Attendance = require('../models/Attendance');
const Session = require('../models/Session');
const User = require('../models/User');
const { isInSame24Subnet } = require('../utils/ip');
const { expireOldSessions } = require('./session.controller');

async function markAttendance(req, res) {
  const { session_id, device_id, device_ip, gateway_ip } = req.body;
  if (!session_id || !device_id || !device_ip || !gateway_ip) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } });
  }

  await expireOldSessions();

  const session = await Session.findById(session_id);
  if (!session) return res.status(404).json({ error: { code: 'VALIDATION_ERROR', message: 'Session not found' } });
  if (!session.active) return res.status(403).json({ error: { code: 'SESSION_NOT_ACTIVE', message: 'Session is not active' } });
  if (new Date() > session.end_time) {
    session.active = false;
    await session.save();
    return res.status(403).json({ error: { code: 'SESSION_EXPIRED', message: 'Session expired' } });
  }

  const user = await User.findById(req.user.id);
  if (!user || user.role !== 'student') {
    return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Only students can mark attendance' } });
  }

  if (user.device_id !== device_id) {
    return res.status(403).json({ error: { code: 'DEVICE_MISMATCH', message: 'Device verification failed' } });
  }

  if (gateway_ip !== session.router_ip || !isInSame24Subnet(session.router_ip, device_ip)) {
    return res.status(403).json({ error: { code: 'INVALID_NETWORK', message: 'Network verification failed' } });
  }

  try {
    const attendance = await Attendance.create({
      student_id: user._id,
      session_id: session._id,
      device_ip,
      marked_at: new Date()
    });
    return res.status(201).json({ message: 'Attendance marked', attendance });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: { code: 'DUPLICATE_ATTENDANCE', message: 'Attendance already marked' } });
    }
    throw err;
  }
}

async function getSessionAttendance(req, res) {
  const session = await Session.findById(req.params.id);
  if (!session) return res.status(404).json({ error: { code: 'VALIDATION_ERROR', message: 'Session not found' } });

  const records = await Attendance.find({ session_id: session._id }).populate('student_id', 'name');
  return res.json({
    session_id: session._id,
    count: records.length,
    records: records.map((record) => ({
      student_id: record.student_id._id,
      name: record.student_id.name,
      marked_at: record.marked_at,
      device_ip: record.device_ip
    }))
  });
}

module.exports = { markAttendance, getSessionAttendance };
