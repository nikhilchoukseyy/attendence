const express = require('express');
const { markAttendance, getSessionAttendance } = require('../controllers/attendance.controller');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/mark', auth, requireRole('student'), markAttendance);
router.get('/session/:id', auth, requireRole('teacher'), getSessionAttendance);

module.exports = router;
