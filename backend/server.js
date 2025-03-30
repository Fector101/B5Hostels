require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");


const authns = require('./src/routes/authns')
const studentRoutes = require('./src/routes/students')
const adminRoutes = require('./src/routes/admin')
const connectDB = require('./src/db')


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
