const express = require('express');
const router = express.Router();

let users = [];

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email, and password are required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  const user = { id: users.length + 1, username, email, watchlist: [] };
  users.push(user);
  res.status(201).json(user);
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
