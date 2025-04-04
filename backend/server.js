require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const http = require("http");
const socketIo = require("socket.io");
const jwt = require('jsonwebtoken')

const connectDB = require('./src/db');
const { verifyToken, generateUniqueFileName, doDataBaseThing } = require('./src/helper/basic');
const Student = require('./src/models/Student');
const Room = require('./src/models/Room');

const CLIENT_URL = process.env.CLIENT_URL
if (!CLIENT_URL) {
    throw new Error('Please add CLIENT_URL to env vars')
}

const app = express();
const server = http.createServer(app)


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE"
}))

const io = socketIo(server, {
    cors: {
        origin: CLIENT_URL,
        credentials: true
    }
});

// Need to Export io to use in other files, Before Requiring the routes
module.exports = {io};

// Routes need to be required after io is defined and exported
const authns = require('./src/routes/authns')
const studentRoutes = require('./src/routes/students')
const adminRoutes = require('./src/routes/admin')




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


io.use((socket, next) => {
    try {
        // console.log('Handshake Value ---> ', socket.handshake)
        // console.log('Cookie Value ---> ',socket.handshake?.headers.cookie)

        if (!socket.handshake?.headers?.cookie) {
            return next(new Error('No cookies found'));
        }
        let token = socket.handshake.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('userInfo='))
            ?.split('=')[1];

        if (!token) {
            token = socket.handshake.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('adminInfo='))
            ?.split('=')[1];
        }
        if (!token) {
            return next(new Error('No authentication token found'));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification failed:', err.message);
                return next(new Error(`Authentication failed: ${err.message}`));
            }
            socket.user = user;
            next();
        });
    }
    catch (error) {
        console.error('Authentication middleware error:', error);
        next(new Error('Internal authentication error'));
    }
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    Room.find().then(rooms => {
        socket.emit('roomsUpdate',rooms);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});


// MongoDB Connection
connectDB()

// app.use(cors({
//     origin: "https://b5hostel.vercel.app",  // Your frontend URL
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true
// }));

// Connect to MongoDB



// import { v2 as cloudinary } from 'cloudinary';

async function Test() {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            './hostel-receipt (3).pdf', {
            public_id: 'stuff',
        }
        )
        .catch((error) => {
            console.log(error);
        });
    console.log(uploadResult);
}
// Test();



// Configure Multer for file handling
const storage = multer.memoryStorage(); // Store file in memory before uploading
const upload = multer({ storage });

app.post("/upload-profile-pic", verifyToken, upload.single("image"), async (req, res) => {
    // console.log(req.file, 'req.file');

    try {
        const unique_file_name = generateUniqueFileName(req.file.originalname, req.user.matric_no);

        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        await cloudinary.uploader.upload_stream(
            {
                resource_type: "image",
                folder: "images",
                public_id: unique_file_name,
            },
            async (error, result) => {
                if (error) {
                    console.log('Error uploading image:', error);
                    return res.status(500).json({ msg: error.message });
                }

                await doDataBaseThing(() =>
                    Student.findOneAndUpdate(
                        { matric_no: req.user.matric_no },
                        { $set: { profile_pic: result.secure_url } },
                        { new: true }
                    ))

                return res.json({ msg: "Image uploaded successfully", url: result.secure_url });
            }
        ).end(req.file.buffer);
    } catch (error) {
        console.log('Server Error Image File Upload', error);
        res.status(500).json({ msg: "Failed to upload file" });
    }
});


// app.post("/upload", verifyToken, upload.single("pdf"), async (req, res) => {
//     console.log(req.file, 'req.file');
//     const unique_file_name = generateUniqueFileName('req.file.originalname.pdf', req.user.matric_no)
//     if (!req.file) {
//         return res.status(400).json({ msg: "No file uploaded" });
//     }

//     try {
//         const student = await doDataBaseThing(()=> Student.findOne({ matric_no: req.user.matric_no }))

//         if (!student) {
//             return res.status(404).json({ msg: "Failed to Find Student" });
//         }
//         else if (student !=='db_error' && student.pdfs.length >= 5) {
//             return res.status(400).json({ msg: "You can only upload up to 5 PDFs." });
//         }
//         // const uploadStream = 
//         await cloudinary.uploader.upload_stream(
//             { resource_type: "raw", folder: "pdfs", public_id: unique_file_name, format: "pdf" },
//             async (error, result) => {
//                 if (error) {
//                     return res.status(500).json({ msg: error.message });
//                 }

//                 await doDataBaseThing(() => Student.findOneAndUpdate(
//                     { matric_no: req.user.matric_no },
//                     { $push: { pdfs: { name: req.file.originalname, url: result.secure_url } } },
//                     { new: true }
//                 ))
//                 // console.log(result, 'result');
//                 res.json({ msg: 'File Uploaded SuccessFully' });
//             }
//         ).end(req.file.buffer);
//         // uploadStream
//     } catch (error) {
//         console.log('Server Error File Upload', error);
//         res.status(500).json({ msg: "Failed to upload file -se" });
//     }
// });


// Routes
app.use('/', studentRoutes)
app.use('/admin', adminRoutes)
app.use('/api/authn', authns)

app.get('/hello', (req, res) => {
    res.status(200).json({ msg: "Server's Up" })
});



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
