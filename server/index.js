// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

// Rating Schema
const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
});

const Rating = mongoose.model('Rating', ratingSchema);

// Endpoint for student form submission
app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: 'Student data saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save student data' });
  }
});

// Endpoint for rating submission
app.post('/api/ratings', async (req, res) => {
  try {
    const newRating = new Rating(req.body);
    await newRating.save();
    res.json({ message: 'Rating saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save rating' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
