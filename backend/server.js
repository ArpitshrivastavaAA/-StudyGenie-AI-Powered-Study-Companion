const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const studyRoutes = require('./routes/studyRoutes');
const { sendDailyReminders } = require('./services/scheduler');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/study', studyRoutes);

// Cron Job for daily reminders (runs every day at 8:00 AM)
cron.schedule('0 8 * * *', () => {
    console.log('Running daily reminder cron job...');
    sendDailyReminders();
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});