const express = require("express");
const { verifyTokenAdmin, doDataBaseThing } = require("../helper/basic");
const Room = require("../models/Room");
const Student = require("../models/Student");

const router = express.Router();

let all_students;
let all_rooms;

router.get("/dashboard", verifyTokenAdmin, async (req, res) => {
    all_students = (await doDataBaseThing(() => Student.find()));
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
        (room) => room.occupants === room.capacity
    ).length;
    const under_maintenance = all_rooms.filter(
        (room) => room.status === "maintenance"
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
    const data = {
        page_title: "dashboard",
        under_maintenance,
        full_rooms,
        available_rooms,
        total_rooms,
        total_students_that_have_rooms,
        total_students,
        awaiting_approval,
        msg: 'Successfully Fetched Data'
    }
    return res.status(201).json(data);
});

router.get("/all-data", verifyTokenAdmin, async (req, res) => {
    all_students = (await doDataBaseThing(() => Student.find()));
    all_rooms = (await doDataBaseThing(() => Room.find()));
    // const rooms = await doDataBaseThing(() => Room.find());
    // console.log(students)
    const data = {
        students: all_students,
        rooms: all_rooms,
        msg: 'Successfully Fetched Data'

    }
    return res.status(201).json(data);
});

router.get("/rooms", async (req, res) => {
    all_rooms = (await doDataBaseThing(() => Room.find()));
    // const rooms = await doDataBaseThing(() => Room.find());
    res.render("admin-rooms", { page_title: "rooms", rooms: all_rooms });
});

function randomImg() {
    return "img" + Math.floor(Math.random() * 15) + ".jpg";
}


router.post("/assign-room", async (req, res) => {
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
    try{
        await doDataBaseThing(() => {
            room.occupants.push({ matric_no });
            room.save();
        });
    
        await doDataBaseThing(() => {
            user.room = room_number;
            user.save();
        });

        return res.status(200).json({ msg: "Student Successfully Added to Room" });
    }catch(error){
        console.log('Error Assigning Room: ',error)
        return res.status(400).json({ msg: "-An Error Occured, Please Try Again" });
    }
    // console.log('ME ', user)
});
router.post("/add-room", async (req, res) => {
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
        title: room_number,
        img: randomImg(),
    });
    // console.log('This is room --> ', room)
    const result = await doDataBaseThing(() => room.save());

    if (result === "db_error") {
        return res
            .status(400)
            .json({ msg: "An error occurred while saving the Room, Check Inputs" });
    } else {
        console.log("added room");
        return res.status(200).json({ msg: "Room Successfully Added" });
    }
});

router.post("/verify-student", async (req, res) => {
    const { matric_no } = req.body;

    const user = await doDataBaseThing(() => Student.findOne({ matric_no }));
    if (user === "db_error") {
        return res
            .status(400)
            .json({ msg: "-An Error, Please Try Again" });
    } else if (!user) {
        return res
            .status(400)
            .json({ exists: true, msg: "Student doesn't Exist" });
    }
    try {
        await doDataBaseThing(() => {
            user.verified = true
            user.save();
        });
        return res.status(200).json({ url:'/receipt',msg: "Successfully Verified Student" });
    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .json({ msg: "-An Error Occured, Please Try Again" });
    }
})

// router.post("/reject-student-room", async (req, res) => {
// const { matric_no } = req.body;
// const user = await doDataBaseThing(() => Student.findOne({ matric_no }));

// if (user === "db_error") {
//     return res
//         .status(400)
//         .json({ msg: "-An Error Occured, Please Try Again" });
// } else if (!user) {
//     return res
//         .status(400)
//         .json({ exists: true, msg: "Student doesn't Exist" });
// }
//     try {
//         await doDataBaseThing(() => {
//             user.preference = ''
//             user.save();
//         });
//         return res.status(200).json({ msg: "Rejected Student Room Successfully" });
//     } catch (err) {
//         console.log(err)
//         return res
//             .status(400)
//             .json({ msg: "-An Error Occured, Please Try Again" });
//     }

// })
module.exports = router;
