const express = require('express');
const router = express.Router();

let posts = [];

router.get('/', (req, res) => {
  res.json(posts.sort((a, b) => b.createdAt - a.createdAt));
});

router.post('/', (req, res) => {
  const { userId, title, body, attachmentUrl } = req.body;
  if (!userId || !title || !body) {
    return res.status(400).json({ error: 'userId, title, and body are required' });
  }
  const post = {
    id: posts.length + 1, userId, title, body,
    attachmentUrl: attachmentUrl || null, likes: 0, comments: [], createdAt: new Date()
  };
  posts.push(post);
  res.status(201).json(post);
});

router.post('/:id/like', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  post.likes += 1;
  res.json(post);
});

module.exports = router;
