require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Security: Rate Limiters
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const path = require('path');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CommunityFix API running' });
});

app.use('/api/auth', authLimiter, require(path.join(__dirname, 'routes', 'auth.js')));
app.use('/api/tickets', apiLimiter, require(path.join(__dirname, 'routes', 'tickets.js')));
app.use('/api/communities', apiLimiter, require(path.join(__dirname, 'routes', 'communities.js')));
app.use('/api/admin', apiLimiter, require(path.join(__dirname, 'routes', 'admin.js')));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
