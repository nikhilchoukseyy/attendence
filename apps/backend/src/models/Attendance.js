const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    marked_at: { type: Date, default: Date.now },
    device_ip: { type: String, required: true }
  },
  { timestamps: false }
);

attendanceSchema.index({ student_id: 1, session_id: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
