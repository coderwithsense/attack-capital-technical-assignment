const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/post', authMiddleware, createPost);
router.get('/posts', getPosts);

module.exports = router;
