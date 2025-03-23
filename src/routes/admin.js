const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const verifyToken = require("../helper/basic");
const Room = require("../models/Room"); // Import the Room model
const Student = require("../models/Student");

const router = express.Router();
router.use(cookieParser());

router.get('/dashboard', (req, res) => {
    res.render('admin-dashboard', { page_title: 'dashboard' });
});

router.get('/students', (req, res) => {
    res.render('admin-students', { page_title: 'students' });
});

router.get('/rooms', (req, res) => {
    res.render('admin-rooms', { page_title: 'rooms' });
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function doDataBaseThing(func, arg=false) {
    let room;
    try {
room = arg ? await func(arg) : await func();
        return room
    } catch (err) {

        console.log(err,'First attempt failed, retrying in 1 second...');
        await delay(1000); // Wait 1 second before retrying

        try {
room = arg ? await func(arg) : await func();
            return room
        } catch (err) {
            console.log('second try failed')
            return 'db_error'
        }
    }
}
router.post("/add-room", async (req, res) => {

    const { room_number, block, floor, status, capacity, amenities } = req.body;
const floorNumber = Number(floor);
    console.log({ room_number, block, floor, status, capacity, amenities })
    let room = await doDataBaseThing(() => Room.findOne({ room_number }));

    if (room == 'db_error') { return res.status(400).json({ msg: "Network Error, Try Refreshing Page" });}
    else if (room) {
 return res.status(400).json({ exists: true, msg: "Room Already Register" }); }


 room = new Room({
    room_number,
    block,
    floor:floorNumber,
    status,
    capacity,
    amenities,
});

const result = await doDataBaseThing(() => room.save());

    if (result == 'db_error') { return res.status(400).json({ msg: "Network Error, Try Refreshing Page" });}
    else { 
console.log("added room")
    return res.status(200).json({ msg: "Room Successfully Register" }); }

})

module.exports = router;