const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    matric_no: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
    // status: { type: String, enum: ['Pending', 'Resolved', 'In Progress'], default: 'Pending' },
    created_at: { type: Date, default: Date.now },
    resolved_at: { type: Date }
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
