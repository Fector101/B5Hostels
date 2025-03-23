const mongoose = require("mongoose");
// const Student = require("./Student");

const RoomSchema = new mongoose.Schema({
    img: { type: String}, // Image URL or filename
    room_number: { type: String, required: true, unique: true },
    block:  { type: String},
    floor:  { type: Number},
    status:  { type: String},
    capacity:  { type: Number},
    amenities:  { type: String},
    // Use ObjectId references instead of embedding Student model
    occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});


const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;

