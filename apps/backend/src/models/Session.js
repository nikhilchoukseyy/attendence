const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    router_ip: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

sessionSchema.index({ active: 1, end_time: 1 });

module.exports = mongoose.model('Session', sessionSchema);
