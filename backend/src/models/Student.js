
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matric_no: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  level: { type: String, required: true },
  verified: { type: String,default: false, required: false },
  rejected_room: { type: Boolean, required: false },

  room: { type: String, required: false },
  preference: { type: String, required: false },

  payments: [
    {
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    }
  ]
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student