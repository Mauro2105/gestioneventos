const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./router/route.user');
const eventRoutes = require('./router/route.events');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', userRoutes);
app.use('/events', eventRoutes);


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));