const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const verifyToken = require("../helper/basic");
const Room = require("../models/Room"); // Import the Room model
const Student = require("../models/Student");

const router = express.Router();
router.use(cookieParser());

async function getRoomWithStudents(roomId) {
    const room = await Room.findById(roomId).populate("occupants").exec();
    console.log(room);
}

async function assignStudentToRoom(matric_no, roomId) {
    const student = await Student.findById(matric_no);
    const room = await Room.findById(roomId);

    if (!student || !room) {
        console.log("Student or Room not found");
        return;
    }

    // Add student to room
    room.occupants.push(student._id);
    room.occupied += 1;
    await room.save();

    // Assign room to student
    student.room = room._id;
    await student.save();

    console.log(`Assigned ${student.name} to room ${room.title}`);
}

router.get("/dashboard", verifyToken, (req, res) => {
    const userInfo = req.user;
    // const token = jwt.sign({ id: user._id, username: user.username, matric_no: user.matric_no }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.cookie('userInfo', token
    // Data save in token always save in `req.user`
    // console.log(req)
    // console.log(userInfo)
    const data = {
        page_title: "dashboard",
        name: userInfo.name.split(" ")[0],
        matric_no: userInfo.matric_no,
        level: userInfo.level,
        room: userInfo.room || "Nil",
        date_booked: userInfo.days_left || 0,
        total_paid: userInfo.total_paid || "Nil"
    };
    res.render("dashboard", data);
});

router.get("/room/:title", async (req, res) => {
    const title = req.params.title;
    console.log(title, " title");
    const roomData = await Room.findOne({ title });
    // getRoomWithStudents(roomData._id)
    if (roomData) {
        res.render("room", {
            img_path: roomData.img,
            page_title: "dashboard",
            title: roomData.title,
            occupants: roomData.occupants,
        }); //, description: roomData.description });
    } else {
        res.status(404).render("room", {
            title: "Room Not Found",
            description: "This room does not exist.",
        });
    }
});
// router.get('/home',verifyToken, (req, res) => {
//     const userInfo = req.user
//     console.log(userInfo,5678)

//     res.render('lists', {  page_title:'home',name: userInfo.name, room: userInfo.room || 'None', date_booked: userInfo.date_booked || 'not booked' });
// });

router.get("/home", verifyToken, async (req, res) => {
    try {
        const rooms = await Room.find(); // Fetch all rooms from MongoDB
        res.render("rooms", { page_title: "home", rooms }); // Pass rooms data to EJS template
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

module.exports = router;
