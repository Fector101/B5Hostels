
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matric_no: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  level: { type: String, required: true },

  total_paid: { type: Number, default: 0 },
  room: { type: String, required: false },
  date_booked: { type: String, required: false },

  payments: [
    {
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);