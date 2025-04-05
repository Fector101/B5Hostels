const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const { doDataBaseThing, verifyToken, verifyTokenAdmin } = require("../helper/basic");

const router = express.Router();

function GENERATE_COOKIE_CONFIG(hrs = 1) {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 3600000 * hrs
    }
}
router.post("/signup", async (req, res) => {
    try {
        const { name, email, matric_no, password, gender, level } = req.body;
        // console.log(name, email, matric_no, password, gender, level);
        let user = await doDataBaseThing(() => Student.findOne({ matric_no }));
        if (user)
            return res
                .status(400)
                .json({ exists: true, msg: "Matric Number Already Register" });

        user = await doDataBaseThing(() => Student.findOne({ email }));
        if (user)
            return res
                .status(400)
                .json({ exists: true, msg: "Email Already Used" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new Student({
            name,
            matric_no,
            email,
            password: hashedPassword,
            gender,
            level,
        });
        user = await doDataBaseThing(() => user.save());
        if (user === "db_error") {
            return res.status(400).json({
                exists: true,
                msg: "An error occurred while saving the user.",
            });
        }

        const data = { matric_no, role: "student" };
        const token = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "4h",
        });
        res.cookie("userInfo", token, GENERATE_COOKIE_CONFIG(4));

        return res.status(200).json({
            redirect: true,
            url: "/profile",
            msg: "Signup SuccessFul",
        });
    } catch (err) {
        console.log("signup error: ", err);
        res.status(500).json({ msg: 'Something went wrong! -se' });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { matric_no, password } = req.body;
        let user = await doDataBaseThing(() => Student.findOne({ matric_no }));
        // const user = await Student.findOne({ matric_no });
        if (user === 'db_error') { return res.status(400).json({ msg: 'Something went wrong! -dbe' }) }
        else if (!user) { return res.status(400).json({ msg: 'Student doesn\'t exist' }); }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        const data = {
            matric_no: user.matric_no
        };
        const token = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "4h",
        });

        res.cookie("userInfo", token, GENERATE_COOKIE_CONFIG(4));

        return res.status(200).json({
            redirect: true,
            url: "/profile",
            msg: "Login SuccessFul",
        });
    } catch (err) {
        console.log("login error: ", err);
        res.status(500).json({ msg: 'Something went wrong! -se' });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("userInfo", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.redirect("/login");
});

router.post("/logout-admin", (req, res) => {
    res.clearCookie("adminInfo", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.redirect("/login");
});

router.post("/admin-login", async (req, res) => {
    try {
        const { password } = req.body;
        // const user = await Student.findOne({ matric_no });
        const isMatch = password === (process.env.admin_password || "admin");
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        const data = { id: process.env.JWT_SECRET, role: "admin" }
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.cookie("adminInfo", token, GENERATE_COOKIE_CONFIG(24));

        return res.status(201).json({ msg:"Admin Login Successful" });
    } catch (err) {
        console.log('admin login error: ', err)
        res.status(500).json({ msg: 'Something went wrong! -se' });
    }
});


router.get('/student-logged', verifyToken, (req, res) => {
    const token = req.cookies.userInfo;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ matric_no: decoded.matric_no });
    } catch (error) {
        return res.status(401).json({ msg: "Something went wrong! -Authne" });
    }
});

router.get('/admin-logged', verifyTokenAdmin, (req, res) => {
    const token = req.cookies.adminInfo;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ matric_no: decoded.matric_no });
    } catch (error) {
        return res.status(401).json({ msg: "Something went wrong! -Authne" });
    }
});
module.exports = router;
