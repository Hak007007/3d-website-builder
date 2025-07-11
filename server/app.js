// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const websiteRoutes = require('./routes/website');

app.use('/api/auth', authRoutes);
app.use('/api/website', websiteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(1234, () => console.log('Server running on port 1234'));
  })
  .catch(err => console.log(err));
