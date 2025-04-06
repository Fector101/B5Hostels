
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    matric_no: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    level: { type: Number, required: true },
    verified: { type: Boolean, default: false, required: false },
    status:  { type: String, enum: ["verified", "pending","rejected"], default: "pending" },

    rejected_room: { type: Boolean, required: false },

    room: { type: String, required: false },
    preference: { type: String, required: false },

    profile_pic: { type: String, required: false },
    pdfs: [
        {
            name: { type: String, required: false },
            url: { type: String, required: false },
        }
    ],

    payments: [
        {
            amount: { type: Number, required: true },
            date: { type: Date, default: Date.now },
        }
    ]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student