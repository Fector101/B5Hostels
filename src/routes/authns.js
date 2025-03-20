const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")
const Student = require('../models/Student');

const router = express.Router();
router.use(cookieParser())

router.post('/signup', async (req, res) => {
    try {
        const { name, email, matric_no, password,gender, level} = req.body
        console.log(name, email, matric_no, password,gender,level)

        

        let user = await Student.findOne({ matric_no })

        if (user) return res.status(400).json({ exists: true, msg: "Matric Number Already Register" })
        user = await Student.findOne({ email })
        if (user) return res.status(400).json({ exists: true, msg: "Email Already Used" })

        const hashedPassword = await bcrypt.hash(password, 10)
        user = new Student({ name, matric_no, email, password: hashedPassword,gender,level })
        await user.save()
                    const token = jwt.sign({ id: student.id,level, email,gender, username: student.name, matric_no }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.cookie('userInfo', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour

        res.status(201).json({ ok: true, msg: 'Student registered successfully' })

    } catch (err) {
        console.log('signup error: ', err)
        res.status(500).json({ error: 'Server error' })
    }
});


// router.post('/login', async (req, res) => {
//     try {
//         const { matric_no, password } = req.body;

//         const user = await Student.findOne({ matric_no });
//         if (!user) return res.status(400).json({ msg: 'Student doesn\'t exist' });


//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({msg : 'Invalid password' });


//         const token = jwt.sign({ id: user._id, username: user.username, matric_no: user.matric_no }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Set token in HTTP-only cookie
//         res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour
        
//         res.json({ msg: user.username });
//     } catch (err) {
//         console.log('login error: ', err)
//         res.status(500).json({ msg: 'Server error' });
//     }
// });

// router.post('/admin-login', async (req, res) => {
//     try {
//         const { password } = req.body;
//         // const user = await Student.findOne({ matric_no });
//         const isMatch = password === 'admin' // process.env.admin_password)
//         if (!isMatch) return res.status(400).json({ error: 'Invalid password' });


//         const token = jwt.sign({ id: process.env.JWT_SECRET}, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Set token in HTTP-only cookie
//         res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour
        
//         res.json({ redirect: '/admin-dashboard' });

//     } catch (err) {
//         console.log('login error: ', err)
//         res.status(500).json({ error: 'Server error' });
//     }
// });

module.exports = router;
