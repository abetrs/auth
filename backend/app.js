// Modules
const express = require('express');
const mongoose = require('mongoose');
const volleyball = require('volleyball');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/users');
// Essential variables
const app = express();
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://127.0.0.1:27017', () => {
  console.log("Connected to Mongoose");
});
// Middleware
app.use(volleyball);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Routes
app.use('/auth', authRoutes);
// Listening on http://localhost:3000 or whatever
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
})
app.listen(port, () => {
  console.log(`Now listening for requests on 👌  http://localhost:${port}`);
});