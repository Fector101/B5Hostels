const express = require('express')
const path = require('path')
const cookieParser = require("cookie-parser")
const verifyToken = require('../helper/basic')


const router = express.Router();
router.use(cookieParser())




router.get('/dashboard',verifyToken, (req, res) => {
    const userInfo = req.cookies.token
    console.log(userInfo)
    try{
        console.log(JSON.parse(userInfo.username),'|----|')
    }catch(err){
        console.log(err)
    }
    console.log(req)
    res.render('dashboard', { username: req.user.username });
})




module.exports = router;