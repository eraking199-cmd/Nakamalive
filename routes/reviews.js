const express = require('express');
const router = express.Router();

let reviews = [];

router.get('/', (req, res) => {
  const { malId } = req.query;
  const filtered = malId ? reviews.filter(r => r.malId === Number(malId)) : reviews;
  res.json(filtered);
});

router.post('/', (req, res) => {
  const { malId, userId, score, text } = req.body;
  if (!malId || !userId || !score) {
    return res.status(400).json({ error: 'malId, userId, and score are required' });
  }
  const review = { id: reviews.length + 1, malId, userId, score, text: text || '', createdAt: new Date() };
  reviews.push(review);
  res.status(201).json(review);
});

module.exports = router;
