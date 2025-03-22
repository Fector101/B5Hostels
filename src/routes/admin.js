const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const verifyToken = require("../helper/basic");
const Room = require("../models/Room"); // Import the Room model
const Student = require("../models/Student");

const router = express.Router();
router.use(cookieParser());

router.get('/dashboard', (req, res) => {
    res.render('admin-dashboard', {  page_title:'dashboard'});
});

router.get('/students', (req, res) => {
    res.render('admin-students', {  page_title:'students'});
});

router.get('/rooms', (req, res) => {
    res.render('admin-rooms', {  page_title:'rooms'});
});
module.exports = router;

module.exports = router;
