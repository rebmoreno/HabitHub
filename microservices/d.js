const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Quotes database
const quotes = {
    general: [
        "Believe in yourself and all that you are.",
        "Every day is a chance to get better.",
        "Success is not final, failure is not fatal.",
    ],
    fitness: [
        "Push harder, go further!",
        "Sweat is just fat crying.",
        "The pain you feel today will be the strength you feel tomorrow.",
    ],
};

// Endpoint to fetch a random quote
app.get('/quote', (req, res) => {
    const category = req.query.category || 'general';
    const categoryQuotes = quotes[category] || quotes.general;
    const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
    res.json({ text: randomQuote });
});

// Endpoint to calculate the longest habit streak
app.post('/streak', (req, res) => {
    const { dates } = req.body;
    if (!dates || !Array.isArray(dates)) {
        return res.status(400).json({ error: 'Invalid or missing dates array' });
    }

    // Sort dates and calculate streak
    const sortedDates = dates.map(date => new Date(date)).sort((a, b) => a - b);
    let longestStreak = 1, currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
        const diff = (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
        } else {
            currentStreak = 1;
        }
    }

    res.json({ longestStreak });
});

// Start the server
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


