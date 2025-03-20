const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matric_no: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true  },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  gender: { type: String, required: true },

});

module.exports = mongoose.model('Student', studentSchema);
