const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json());

// In-memory storage for reminders (for simplicity)
let reminders = [];


// Endpoint to create a reminder
app.post('/reminders', (req, res) => {
    const { habitName, reminderTime } = req.body;

    if (!habitName || !reminderTime) {
        return res.status(400).json({ message: 'Habit name and reminder time are required.' });
    }

    const newReminder = {
        id: reminders.length + 1,
        habitName,
        reminderTime: new Date(reminderTime),
    };

    // Store the reminder in the array
    reminders.push(newReminder);
    return res.status(201).json({ message: 'Reminder set!', reminder: newReminder });
});

// Background task to check and send notifications every minute
setInterval(() => {
    const now = new Date();
    reminders = reminders.filter(reminder => {
        if (now >= reminder.reminderTime) {
            console.log(`Reminder: Time to ${reminder.habitName}!`);
            return false; 
        }
        return true;
    });
}, 60 * 1000); 

// Endpoint to log out
app.post('/logout', (req, res) => {
    console.log('User logged out');
    res.json({ message: 'Logged out successfully' });
});

// Start the server
app.listen(3002, () => {
    console.log('Service running on port 3002.');
});
