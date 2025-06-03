// src/controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await Post.create({
      title,
      content,
      authorId: req.user._id,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('CreatePost error:', error);
    res.status(500).json({ message: 'Server error while creating post.' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.author) {
      filter.authorId = req.query.author;
    }
    // Populate author’s email (optional)
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .populate('authorId', 'email');
    res.json(posts);
  } catch (error) {
    console.error('GetPosts error:', error);
    res.status(500).json({ message: 'Server error while fetching posts.' });
  }
};
