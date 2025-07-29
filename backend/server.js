const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for frontend/backend communication

// Routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/users', userRoutes);                         // User registration & login
app.use('/api/projects', projectRoutes);                   // Project CRUD
app.use('/api/projects/:projectId/tasks', taskRoutes);     // Nested Task CRUD

// Env Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
