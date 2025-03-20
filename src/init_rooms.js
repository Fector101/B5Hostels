const Room = require("./models/Room");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/groupb5", { useNewUrlParser: true, useUnifiedTopology: true });

const rooms = [
    { img: "img1.jpg", title: "Room 1", occupied: 2, location:'New Hostel'},
    { img: "img2.jpg", title: "Room 2", occupied: 1, location:'Old Hostel'},
    { img: "img3.jpg", title: "Room 3", occupied: 2, location:'New Hostel'},
];

Room.insertMany(rooms)
    .then(() => {
        console.log("Rooms added");
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
