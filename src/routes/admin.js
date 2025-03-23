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

async function doDataBaseThing(func, arg) {
    let room;
    try {
        room = await func(arg)
        return room
    } catch (err) {

        console.log('First attempt failed, retrying in 1 second...');
        await delay(1000); // Wait 1 second before retrying

        try {
            room = await func(arg)
            return room
        } catch (err) {
            console.log('second try failed')
            return 'db_error'
        }
    }
}
router.post("/add-room", async (req, res) => {

    const { room_number, block, floor, status, capacity, amenities } = req.body;
    console.log({ room_number, block, floor, status, capacity, amenities })
    let room = await doDataBaseThing(Room.findOne, { room_number })

    if (room == 'db_error') { return res.status(400).json({ msg: "Network Error, Try Refreshing Page" });}
    else if (room) { return res.status(400).json({ exists: true, msg: "Room Already Register" }); }
    
    user = new Room({
                name,
                matric_no,
                email,
                password: hashedPassword,
                gender,
                level,
            });
            await user.save();
    return res.status(200).json({ exists: true, msg: "Room Successfully Register" });
})

module.exports = router;