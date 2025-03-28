const jwt = require('jsonwebtoken')
const path = require('path')


const verifyToken = (req, res, next) => {
    const userInfo = req.cookies.userInfo;

    // console.log("Headers:", req.headers);
    // console.log("Cookies received:", req.cookies);
    // console.log('userInfo: ', userInfo)
    if (!userInfo) return res.status(401).json({ msg: 'Access denied' });
    
    try {
        const verified = jwt.verify(userInfo, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.log(err)
        // res.status(400).json({ error: 'Invalid token' });
        return res.status(400).json({ msg: 'Bad Request' });
    }
};


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function doDataBaseThing(func, arg = false) {
    let room;
    try {
        room = arg ? await func(arg) : await func();
        return room
    } catch (err) {

        console.log(err, 'First attempt failed, retrying in 1 second...');
        await delay(1000); // Wait 1 second before retrying

        try {
            room = arg ? await func(arg) : await func();
            return room
        } catch (err) {
            console.log(err,'---second try failed')
            return 'db_error'
        }
    }
}

function daysPassed(date) {
    if(!date) return 0
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
}

module.exports = {verifyToken, doDataBaseThing,daysPassed,delay};
