const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {verifyToken,doDataBaseThing} = require("../helper/basic");
const Room = require("../models/Room"); // Import the Room model
const Student = require("../models/Student");

const router = express.Router();
router.use(cookieParser());

router.get('/dashboard', (req, res) => {
    res.render('admin-dashboard', { page_title: 'dashboard' });
});

router.get('/students', async (req, res) => {
    const students = await doDataBaseThing(() => Student.find());

    res.render('admin-students', { page_title: 'students',students });
});

router.get('/rooms', async (req, res) => {
    const rooms = await doDataBaseThing(() => Room.find());
    res.render('admin-rooms', { page_title: 'rooms',rooms });
});


function randomImg(){
    return 'img'+Math.floor(Math.random() * 21) + '.jpg'
}
router.post("/add-room", async (req, res) => {

    const { room_number, block, floor, status, capacity, amenities } = req.body;
    const floorNumber = Number(floor);
    console.log({ room_number, block, floor, status, capacity, amenities })
    let room = await doDataBaseThing(() => Room.findOne({ room_number }));

    if (room == 'db_error') { return res.status(400).json({ msg: "Network Error, Try Refreshing Page" }); }
    else if (room) {
        return res.status(400).json({ exists: true, msg: "Room Already Added" });
    }


    room = new Room({
        room_number,
        block,
        floor: floorNumber,
        status,
        capacity,
        amenities,
        img:randomImg(),
    });

    const result = await doDataBaseThing(() => room.save());

    if (result == 'db_error') { return res.status(400).json({ msg: "Network Error, Try Refreshing Page" }); }
    else {
        console.log("added room")
        return res.status(200).json({ msg: "Room Successfully Added" });
    }

})

module.exports = router;