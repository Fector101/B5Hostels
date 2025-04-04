require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

const authns = require('./src/routes/authns')
const studentRoutes = require('./src/routes/students')
const adminRoutes = require('./src/routes/admin')
const connectDB = require('./src/db');
const { verifyToken, generateUniqueFileName, doDataBaseThing } = require('./src/helper/basic');
const Student = require('./src/models/Student');


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const CLIENT_URL = process.env.CLIENT_URL
if (!CLIENT_URL) {
    throw new Error('Please add CLIENT_URL to env vars')
}

app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE"
}))
// app.use(cors({
//     origin: "https://b5hostel.vercel.app",  // Your frontend URL
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true
// }));

// Connect to MongoDB
connectDB()



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


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/pages/lists.html'))
// });





// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
