const mongoose = require("mongoose");
// const Student = require("./Student");

const RoomSchema = new mongoose.Schema({
    title: { type: String, unique: true },

    img: { type: String}, // Image URL or filename
    room_number: { type: String, required: true, unique: true },
    block:  { type: String},
    floor:  { type: Number},
    status:  { type: String, enum: ["free", "full","maintenance"], default: "free" },
    // gender:  { type: String, enum: ["male", "female"]},
    capacity:  { type: Number},
    amenities:  [{ type: String }], // Array of strings
    occupants: [
        {
            matric_no: { type: String, required: true }
        }
      ]
});



const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;

