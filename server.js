require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors')


const authns =  require('./src/routes/authns')
const studentRoutes =  require('./src/routes/students')
const connectDB = require('./src/db')


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public','views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


// Connect to MongoDB
connectDB()


// Routes

app.use('/', studentRoutes)
app.use('/api/authn', authns)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/signup.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/login.html'))
});
// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/pages/lists.html'))
// });

app.get('/payment-portal', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/payment.html'))
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/user.html'))
});


app.get('/admin-dashboard', (req, res) => {
    

    res.render('admin-dashboard', {  page_title:'home'});
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
