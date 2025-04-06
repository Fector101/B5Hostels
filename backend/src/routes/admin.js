const express = require("express");
const { doDataBaseThing, verifyTokenAdmin, getInitials, daysPassed, getStudentTotal, adminDataFormattedForRooms } = require("../helper/basic");
const Room = require("../models/Room");
const Student = require("../models/Student");
const { io, connectedUsers } = require('../../server');
const Complaint = require("../models/Complaint");

const router = express.Router();

function randomImg() {
    return "img" + Math.floor(Math.random() * 15) + ".jpg";
}

async function broadcastRoomsUpdates() {
    const rooms = await doDataBaseThing(() => Room.find())
    console.log('Querying DB For Rooms ----')
    if (rooms !== "db_error") {
        io.emit('roomsUpdate', {
            rooms,
            roomsDataSummary: { ...adminDataFormattedForRooms(rooms) }
        });
    }

}


router.get("/all-data", verifyTokenAdmin, async (req, res) => {
    const all_students = (await doDataBaseThing(() => Student.find()));
    // console.log(students)
    const data = {
        students: all_students,
        msg: 'Successfully Fetched Data'
    }
    return res.status(201).json(data);
});

router.post("/add-room",verifyTokenAdmin, async (req, res) => {
    const { room_number, block, floor, status, capacity, amenities
        // ,gender
    } = req.body;
    // console.log({ room_number, block, floor, status, capacity, amenities,gender })
    // return res.status(400).json({ msg: "-An Error Occured, Please Try Again" });
    const floorNumber = Number(floor);
    let room = await doDataBaseThing(() => Room.findOne({ room_number }));

    if (room === "db_error") {
        return res
            .status(400)
            .json({ msg: "-An Error Occured, Please Try Again" });
    } else if (room) {
        return res
            .status(400)
            .json({ exists: true, msg: "Room Already Added" });
    }

    room = new Room({
        room_number,
        block,
        status,
        capacity,
        amenities,
        // gender,
        floor: floorNumber,
        // title: room_number,
        img: randomImg(),
    });
    console.log('This is room --> ', room)
    const result = await doDataBaseThing(() => room.save());

    if (result === "db_error") {
        return res
            .status(400)
            .json({ msg: "An error occurred while saving the Room, Check Inputs" });
    } else {
        await broadcastRoomsUpdates();
        console.log("added room");
        return res.status(200).json({ msg: "Room Successfully Added" });
    }
});

async function emitUserUpdate(user_data) {
    const socketId = connectedUsers.get(user_data.matric_no);
    console.log('Emitting User Update', user_data.matric_no, socketId)
    if (socketId) {
        const data = {
            ...user_data
        };
        io.to(socketId).emit('userDataUpdate', data);
    }
}

router.post("/assign-room",verifyTokenAdmin, async (req, res) => {
    const { matric_no, room_number } = req.body;
    console.log(matric_no, room_number)
    const user = await doDataBaseThing(() => Student.findOne({ matric_no }));

    if (user === "db_error") {
        return res
            .status(400)
            .json({ msg: "-An Error Occured, Please Try Again" });
    } else if (!user) {
        return res
            .status(400)
            .json({ msg: "Student doesn't Exist" });
    }
    let room = await doDataBaseThing(() => Room.findOne({ room_number }));
    if (room.occupants.find(each => each.matric_no === matric_no)) {
        return res
            .status(400)
            .json({ msg: "Student Already in Room" });
    }
    try {
        if (room.occupants.length === room.capacity) {
            return res.status(400).json({ msg: "Operation Failed, Full Room" });
        }
        room.occupants.push({ matric_no });
        if (room.occupants.length === room.capacity) {
            room.status = 'full'
        }
        await doDataBaseThing(() => {
            room.save();
        });

        // const res__ =
        await doDataBaseThing(() => {
            user.room = room_number;
            user.save();
        });
        const user_data = {
            // name: user.name,
            // matric_no: user.matric_no,
            // email: user.email,
            // level: user.level,
            // preference: user.preference,
            // verified: user.verified,
            // profile_pic: user.profile_pic,
            // pdfs_length: user.pdfs.length,

            // initials: getInitials(user.name),
            // days_passed: daysPassed(user.payments[0]?.date),
            // total_paid: getStudentTotal(user.payments)

        }

        const user_room_data = {
            room: room_number,
            capacity: room.capacity,
            floor: room.floor,
            block: room.block,
            room_mates: room.occupants.map(each => each.name || each.matric_no)
        }
        // ;) if (res__ !== "db_error") {
        await emitUserUpdate({ ...user_data, ...user_room_data });
        // console.log('Emitting User Update')
        // }
        await broadcastRoomsUpdates()
        return res.status(200).json({ msg: "Student Successfully Added to Room" });
    } catch (error) {
        console.log('Error Assigning Room: ', error)
        return res.status(400).json({ msg: "-An Error Occured, Please Try Again" });
    }
});

router.post("/update-student-status",verifyTokenAdmin, async (req, res) => {
    const { matric_no, status } = req.body;

    if (!['verified', 'pending', 'rejected'].includes(status)) {
        return res.status(400).json({ msg: 'Invalid status value' });
    }

    const user = await doDataBaseThing(() => Student.findOne({ matric_no }));
    if (user === "db_error") {
        return res
            .status(400)
            .json({ msg: "-An Error Occured, Please Try Again" });
    } else if (!user) {
        return res
            .status(400)
            .json({ exists: true, msg: "Student doesn't Exist" });
    }
    try {
        await doDataBaseThing(() => {
            user.status = status
            user.save();
        });

        // ;) if (res__ !== "db_error") {
        const user_data = {status}
        await emitUserUpdate({ ...user_data });
        return res.status(200).json({ msg: "Successfully Updated Student status" });
    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .json({ msg: "-An Error Occured, Please Try Again -se" });
    }
})

router.get("/complaints", verifyTokenAdmin, async (req, res) => {

    try {
        const complaints = await Complaint.find();
        return res.status(200).json({ complaints });
    } catch (error) {
        console.error("Error fetching complaints:", error);
        return res.status(500).json({ msg: "Error fetching complaints" });
    }
});


router.post("/complaints/:complaintId/resolve", verifyTokenAdmin, async (req, res) => {
    
    const { complaintId } = req.params;

    try {
        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {
            return res.status(404).json({ msg: "Complaint not found" });
        }

        complaint.status = "Resolved";
        complaint.resolved_at = new Date();
        await complaint.save();

        return res.status(200).json({ msg: "Complaint resolved successfully" });
    } catch (error) {
        console.error("Error resolving complaint:", error);
        return res.status(500).json({ msg: "Error resolving complaint" });
    }
});






module.exports = router;
