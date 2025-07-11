// server/models/Website.js
const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  userId: String,
  name: String,
  html: String,
  css: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Website', websiteSchema);
