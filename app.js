const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const app = express();
require('dotenv').config();
const fs = require('fs');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI;

// Enhanced connection options
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ssl: true, // This option is not needed with the new MongoDB Node.js driver
    // sslCA: [fs.readFileSync('/path/to/ca.pem')], // Optional: CA certificate if needed
};

// Connect to MongoDB
mongoose.connect(mongoUri, mongooseOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit the process if connection fails
    });

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
