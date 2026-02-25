const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../utils/jwt');

async function register(req, res) {
  const { name, email, password, role, device_id } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: { code: 'VALIDATION_ERROR', message: 'Email already registered' } });
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password_hash, role, device_id: device_id || null });

  return res.status(201).json({
    message: 'Registered successfully',
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
}

async function login(req, res) {
  const { email, password, device_id } = req.body;
  if (!email || !password || !device_id) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
  }

  if (!user.device_id) {
    user.device_id = device_id;
    await user.save();
  } else if (user.device_id !== device_id) {
    return res.status(403).json({ error: { code: 'DEVICE_MISMATCH', message: 'Device verification failed' } });
  }

  const token = signToken({ id: user._id, role: user.role, email: user.email });
  return res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
}

module.exports = { register, login };
