const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
const { verifyToken, doDataBaseThing, daysPassed, delay, getInitials, getStudentTotal } = require("../helper/basic");
const Room = require("../models/Room"); // Import the Room model
const Student = require("../models/Student");
const Complaint = require("../models/Complaint");

const router = express.Router();
// router.use(cookieParser());

router.get("/profile", verifyToken, async (req, res) => {
    const userInfo = req.user;
    await delay(1000 * 1)
    console.log('done waiting........................')
    // const token = jwt.sign({ id: user._id, username: user.username, matric_no: user.matric_no }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.cookie('userInfo', token
    // Data save in token always save in `req.user`
    // console.log(req)
    // console.log(userInfo)
    const user = await doDataBaseThing(() => Student.findOne({ matric_no: userInfo.matric_no }))
    if (!user) {
        return res.status(401).json({ msg: "Student doesn't exist" });
    }
    
    let room_mates = []
    let room;
    if (user.room) {
        room = await doDataBaseThing(() => Room.findOne({ room_number: user.room }));
        // console.log(room)
        room_mates = room.occupants.map(each => each.name || each.matric_no)
    }
    // console.log(user,'------')
    const data = {
        name: user.name,
        matric_no: user.matric_no,
        email: user.email,
        level: user.level,
        preference: user.preference,
        status: user.status,
        profile_pic: user.profile_pic,
        pdfs_length: user.pdfs.length,

        initials: getInitials(user.name),
        days_passed: daysPassed(user.payments[0]?.date),
        total_paid: getStudentTotal(user.payments),

        // date_booked: userInfo.days_left || 0, //Remove this if not needed :) Later

        room: user.room,
        capacity: room?.capacity,
        floor: room?.floor,
        block: room?.block,
        room_mates,

        page_title: "dashboard",
        msg: "Login In Session"
    };

    // console.log(data,'------')
    return res.status(200).json({ data });
});


router.post("/make-payment", verifyToken, async (req, res) => {
    const { room_number, matric_no } = req.body;
    console.log(matric_no, 'to --> room:', room_number)


    let room = await doDataBaseThing(() => Room.findOne({ room_number }));

    if (room.occupants && room.occupants.length >= room.capacity) {
        return res.status(400).json({ msg: "Payment Declined Room Full" });
    }

    const user = await doDataBaseThing(() => Student.findOne({ matric_no }))

    // todo cheeck date of payment
    if (user && user.payments.length) return res.status(400).json({ msg: "Already Made Payment" });
    // so student can pay without room yet
    // maybe not from site
    if (room_number) {
        user.preference = room_number
    }
    const result = await doDataBaseThing(() => {
        user.payments.push({ amount: 12000 });
        user.save()
    })


    if (result === "db_error") {
        return res
            .status(400)
            .json({ msg: "-An Error, Please Try Again" });
    } else {
        // await broadcastRoomsUpdates() No need for this because room will only be updated when student is assigned
        return res.status(200).json({ msg: "Payment Successful" });

    }

})


// Complaint Submission Route
router.post("/complain", verifyToken, async (req, res) => {
    const { title, message } = req.body;
    await delay(500)
    const userInfo = req.user;

    if (!title || !message) {
        return res.status(400).json({ msg: "Title and Message are required" });
    }

    // Create the complaint in the database
    try {
        const complaint = await doDataBaseThing(() => new Complaint({
            matric_no: userInfo.matric_no,
            title,
            message,
            status: "Pending",  // Or whatever initial status you'd like
            created_at: new Date()
        }).save());

        if (!complaint) {
            return res.status(500).json({ msg: "Failed to submit complaint, please try again" });
        }

        return res.status(200).json({ msg: "Complaint submitted successfully" });
    } catch (error) {
        console.error("Complaint submission error:", error);
        return res.status(500).json({ msg: "An error occurred while submitting your complaint" });
    }
});








// async function getRoomWithStudents(roomId) {
//     const room = await Room.findById(roomId).populate("occupants").exec();
//     // console.log(room);
// }

// async function assignStudentToRoom(matric_no, roomId) {
//     const student = await Student.findById(matric_no);
//     const room = await Room.findById(roomId);

//     if (!student || !room) {
//         // console.log("Student or Room not found");
//         return;
//     }

//     // Add student to room
//     room.occupants.push(student._id);
//     room.occupied += 1;
//     await room.save();

//     // Assign room to student
//     student.room = room._id;
//     await student.save();

//     // console.log(`Assigned ${student.name} to room ${room.title}`);
// }

// router.get("/room/:room_number", async (req, res) => {
//     const room_number = req.params.room_number;
//     // console.log(room_number, " room_number");
//     const roomData = await Room.findOne({ room_number });
//     // getRoomWithStudents(roomData._id)
//     if (roomData) {
//         res.render("room", {
//             img_path: roomData.img,
//             page_title: "dashboard",
//             room_number: roomData.room_number,
//             amenities: roomData.amenities,
//             occupants: roomData.occupants,
//         }); //, description: roomData.description });
//     } else {
//         res.status(404).render("room", {
//             room_number: "Not Found",
//             page_title: "dashboard",
//             amenities: "Not Found",
//             occupants: "Not Found",
//             img_path: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
//             // description: "This room does not exist.",
//         });
//     }
// });

// router.get("/rooms", verifyToken, async (req, res) => {
//     await delay(1000*2)

//     try {
//         const rooms = await Room.find();
//         return res.status(200).json({ data:rooms });
//     } catch (error) {
//         console.error("Error fetching rooms:", error);
//         res.status(500).send("Server Error");
//     }
// });


module.exports = router;

