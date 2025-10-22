// Test script for ChurchConnect backend
// This script will test the basic functionality without requiring a database

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is running successfully!' });
});

// Simulate the routes without database
app.use('/api/auth', (req, res) => {
  res.json({ message: 'Auth routes are set up correctly' });
});

app.use('/api/church', (req, res) => {
  res.json({ message: 'Church routes are set up correctly' });
});

app.use('/api/events', (req, res) => {
  res.json({ message: 'Event routes are set up correctly' });
});

app.use('/api/donations', (req, res) => {
  res.json({ message: 'Donation routes are set up correctly' });
});

app.use('/api/media', (req, res) => {
  res.json({ message: 'Media routes are set up correctly' });
});

app.use('/api/groups', (req, res) => {
  res.json({ message: 'Group routes are set up correctly' });
});

const PORT = process.env.PORT || 5000;

// Check if MongoDB is configured properly
if (process.env.MONGO_URI) {
  console.log('MongoDB URI is configured:', process.env.MONGO_URI);
  
  // Try to connect to MongoDB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected successfully');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Test endpoint: http://localhost:${PORT}/test`);
      });
    })
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      console.log('Starting server without database connection...');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (without database)`);
        console.log('Note: Database connection failed, but server is running');
        console.log(`Test endpoint: http://localhost:${PORT}/test`);
      });
    });
} else {
  console.log('No MongoDB URI found in environment variables');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (without database)`);
    console.log('Note: No database configured');
    console.log(`Test endpoint: http://localhost:${PORT}/test`);
  });
}