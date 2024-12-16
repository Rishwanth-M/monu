const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Student = require('./models/Student'); // Student model for storing student data
const Monument = require('./models/Monument'); // Monument model for searching monuments

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tour', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error(err));

// POST route to save student data
app.post('/submit', async (req, res) => {
    try {
        const student = new Student(req.body); // Use Student model
        await student.save();
        res.status(200).send('Student data saved successfully!');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error saving student data');
    }
});

// Search route for monuments
app.get('/search', async (req, res) => {
    const { searchType, query } = req.query;
    let searchCriteria = {};

    if (searchType === 'name') {
        searchCriteria.Name = { $regex: query, $options: 'i' }; // Case-insensitive search by name
    } else if (searchType === 'state') {
        searchCriteria.State = { $regex: query, $options: 'i' }; // Case-insensitive search by state
    } else if (searchType === 'city') {
        searchCriteria.City = { $regex: query, $options: 'i' }; // Case-insensitive search by city
    }

    try {
        const results = await Monument.find(searchCriteria); // Search monuments based on criteria
        res.status(200).json(results);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error retrieving monuments');
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
