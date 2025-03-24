const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { verifyToken, doDataBaseThing } = require("../helper/basic");
const Room = require("../models/Room"); // Import the Room model
const Student = require("../models/Student");

const router = express.Router();
router.use(cookieParser());
let all_students;
let all_rooms;
router.get("/dashboard", async (req, res) => {
    all_students =(await doDataBaseThing(() => Student.find()));
    all_rooms = (await doDataBaseThing(() => Room.find()));

    const total_students = all_students && all_students.length;
    const awaiting_approval = all_students.filter(
        (student) =>
            (!student.room && student.preference) ||
            (!student.room && student.payments)
    ).length;
    const total_students_that_have_rooms = all_students.filter(
        (student) => student.room
    ).length;
    const total_rooms = all_rooms.length;
    const available_rooms = all_rooms.filter(
        (room) => room.occupants < room.capacity
    ).length;
    const full_rooms = all_rooms.filter(
        (room) => room.occupants == room.capacity
    ).length;
    const under_maintenance = all_rooms.filter(
        (room) => room.status == "maintenance"
    ).length;
    // console.log({
    //     page_title: "dashboard",
    //     under_maintenance,
    //     full_rooms,
    //     available_rooms,
    //     total_rooms,
    //     total_students_that_have_rooms,
    //     total_students,
    //     awaiting_approval,
    // })
    res.render("admin-dashboard", {
        page_title: "dashboard",
        under_maintenance,
        full_rooms,
        available_rooms,
        total_rooms,
        total_students_that_have_rooms,
        total_students,
        awaiting_approval,
    });
});

router.get("/students", async (req, res) => {
    all_students = (await doDataBaseThing(() => Student.find()));
    all_rooms = (await doDataBaseThing(() => Room.find()));
    // const rooms = await doDataBaseThing(() => Room.find());
    // console.log(students)
    res.render("admin-students", {
        page_title: "students",
        students:all_students,
        rooms: all_rooms,
    });
});

router.get("/rooms", async (req, res) => {
    all_rooms = (await doDataBaseThing(() => Room.find()));
    // const rooms = await doDataBaseThing(() => Room.find());
    res.render("admin-rooms", { page_title: "rooms", rooms: all_rooms });
});

function randomImg() {
    return "img" + Math.floor(Math.random() * 21) + ".jpg";
}

router.post("/assign-room", async (req, res) => {
    const { matric_no, room_number } = req.body;
    const user = await doDataBaseThing(() => Student.findOne({ matric_no }));

    if (user == "db_error") {
        return res
            .status(400)
            .json({ msg: "-Network Error, Try Refreshing Page" });
    } else if (!user) {
        return res
            .status(400)
            .json({ exists: true, msg: "Student doesn't Exist" });
    }
    let room = await doDataBaseThing(() => Room.findOne({ room_number }));
    if(room.occupants.find(each => each.matric_no === matric_no) ){
        return res
            .status(400)
            .json({ exists: true, msg: "Student Already in Room" });
    }

    await doDataBaseThing(() => {
        room.occupants.push({ matric_no });
        room.save();
    });

    await doDataBaseThing(() => {
        user.room = room_number;
        user.save();
    });
    console.log('ME ',user)
    return res.status(200).json({ msg: "Student Successfully Added to Room" });
});
router.post("/add-room", async (req, res) => {
    const { room_number, block, floor, status, capacity, amenities } = req.body;
    const floorNumber = Number(floor);
    // console.log({ room_number, block, floor, status, capacity, amenities })
    let room = await doDataBaseThing(() => Room.findOne({ room_number }));

    if (room == "db_error") {
        return res
            .status(400)
            .json({ msg: "-Network Error, Try Refreshing Page" });
    } else if (room) {
        return res
            .status(400)
            .json({ exists: true, msg: "Room Already Added" });
    }

    room = new Room({
        room_number,
        block,
        floor: floorNumber,
        status,
        capacity,
        amenities,
        img: randomImg(),
    });

    const result = await doDataBaseThing(() => room.save());

    if (result == "db_error") {
        return res
            .status(400)
            .json({ msg: "Network Error, Try Refreshing Page" });
    } else {
        console.log("added room");
        return res.status(200).json({ msg: "Room Successfully Added" });
    }
});
// router.post("/add-student-room", async (req, res) => {
//     // const { matric_no, room_number } = req.body;
//     // const user = await doDataBaseThing(() => Student.findOne({ matric_no }));

//     // if (user == "db_error") {
//     //     return res
//     //         .status(400)
//     //         .json({ msg: "-Network Error, Try Refreshing Page" });
//     // } else if (!user) {
//     //     return res
//     //         .status(400)
//     //         .json({ exists: true, msg: "Student doesn't Exist" });
//     // }
//     let room = await doDataBaseThing(() => Room.findOne({ room_number }));
//     // console.log(room)
//     if(room.occupants.find(each => each.matric_no === matric_no) ){
//         res
//             .status(400)
//             .json({ exists: true, msg: "Student Already in Room" });
//     }

//     await doDataBaseThing(() => {
//         room.occupants.push({ matric_no });
//         room.save();
//     });
//     await doDataBaseThing(() => {
//         user.room = room_number;
//         user.save();
//     });
//     return res.status(200).json({ msg: "Student Successfully Added to Room" });

// })

router.post("/reject-student-room", async (req, res) => {
    const { matric_no } = req.body;
    const user = await doDataBaseThing(() => Student.findOne({ matric_no }));

    if (user == "db_error") {
        return res
            .status(400)
            .json({ msg: "-Network Error, Try Refreshing Page" });
    } else if (!user) {
        return res
            .status(400)
            .json({ exists: true, msg: "Student doesn't Exist" });
    }
    try{
        await doDataBaseThing(() => {
            user.preference=''
            user.save();
        });
        return res.status(200).json({ msg: "Rejected Student Room Successfully" });
    }catch(err){
        console.log(err)
        return res
        .status(400)
        .json({ msg: "-Network Error, Try Refreshing Page" });
    }

})
module.exports = router;
