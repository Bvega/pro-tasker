const express = require('express');
const mongoose = require('mongoose'); // ✅ MUST be declared before usage
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load env variables

const app = express();
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable frontend/backend communication

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // 👤 Auth endpoints

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Connect to MongoDB
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
