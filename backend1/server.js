// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const studentDatabase = {
    '12345': { name: 'John Doe', result: 'A' },
    '67890': { name: 'Jane Smith', result: 'B' },
    // Add more students as needed
};

const notifications = [
    { id: 1, title: 'Exam Schedule', content: 'The exam schedule for 2024 has been released.', imageUrl: '/images/exam-schedule.png' },
    { id: 2, title: 'Holiday Notice', content: 'The college will be closed on May 30th for Memorial Day.', imageUrl: '/images/holiday-notice.png' },
    // Add more notifications as needed
];

app.post('/api/check-enrollment', (req, res) => {
    const { enrollmentNumber } = req.body;

    if (studentDatabase[enrollmentNumber]) {
        res.json({ exists: true, result: studentDatabase[enrollmentNumber] });
    } else {
        res.json({ exists: false });
    }
});

app.get('/api/notifications', (req, res) => {
    res.json(notifications);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
