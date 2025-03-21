const mongoose = require("mongoose");
const Student = require("./Student");

const RoomSchema = new mongoose.Schema({
    img: { type: String}, // Image URL or filename
    title: { type: String, required: true, unique: true }, // Room name
    occupied: { type: Number, default: 0 }, // Current number of occupants
    location:  { type: String}, // Optional, if you have Old/New Hostel

    // Use ObjectId references instead of embedding Student model
    occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});


const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;

