require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router/auth.router');
const admin = require('./router/admin-router');
const connectDB = require('./utils/db');
const app = express();
const PORT = 5000;

const corsOptions = {
  origin: 'https://ngo-frontend-o7th.onrender.com',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Debugging middleware
app.use((req, res, next) => {
  console.log('Request Origin:', req.get('Origin'));
  next();
});

app.use('/api/auth/', router);
app.use('/api/admin', admin);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('The server is running on http://localhost:' + PORT);
  });
});







