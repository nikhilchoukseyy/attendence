const express = require('express');
const { startSession, getActiveSession } = require('../controllers/session.controller');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/start', auth, requireRole('teacher'), startSession);
router.get('/active', auth, getActiveSession);

module.exports = router;
