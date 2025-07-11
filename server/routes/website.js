// server/routes/website.js
const express = require('express');
const router = express.Router();
const Website = require('../models/Website');
const jwt = require('jsonwebtoken');

function verify(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.post('/create', verify, async (req, res) => {
  const { name, html, css } = req.body;
  const website = new Website({ userId: req.user.id, name, html, css });
  await website.save();
  res.json({ message: 'Website saved' });
});

router.get('/my', verify, async (req, res) => {
  const websites = await Website.find({ userId: req.user.id });
  res.json(websites);
});

router.get('/list', verifyToken, async (req, res) => {
  const websites = await Website.find({ userId: req.user.id });
  res.json(websites);
});


module.exports = router;
