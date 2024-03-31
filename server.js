const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const roomRoutes = require('./components/routes/roomRoutes');
const authRoutes = require('./components/routes/authRoutes');
const authenticateUser = require('./components/middleware/authendicate');
const videoRoutes = require('./components/routes/videoRoutes')

const path = require('path')
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose.connect("mongodb://localhost:27017/SocialMedia").then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

app.use('/auth', authRoutes);
app.use('/video', videoRoutes);
app.use('/api', authenticateUser, roomRoutes); // Changed route for protected API

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


