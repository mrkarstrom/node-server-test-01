import express from 'express';
import logger from '../middleware/logger.js';

const router = express.Router();
let posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'This is the first post',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'This is the second post',
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'This is the third post',
  },
];

// Get all posts with optional limits and offset
router.get('/', logger, (req, res) => {
  const limit = parseInt(req.query.limit, 10) || posts.length;
  const offset = parseInt(req.query.offset, 10) || 0;

  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({ error: 'Invalid limit parameter.' });
  }
  if (isNaN(offset) || offset <= 0) {
    return res.status(400).json({ error: 'Invalid offset parameter.' });
  }

  const paginatedPosts = posts.slice(offset, offset + limit);
  res.status(200).json({
    data: paginatedPosts,
    total: posts.length,
    limit,
    offset,
  });
});

// Get a single post by ID
router.get('/:id', logger, (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid post ID.' });
  }

  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`A post with the id of: ${id} was not found!`);
    return next(error);
  }

  res.status(200).json(post);
});

// Create a new post
router.post('/', logger, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: 'You need to enter both title and content' });
  }

  const id = posts.length + 1;
  const newPost = { id, title, content };
  posts.push(newPost);

  res.status(201).json(newPost);
});

// Update an existing post
router.put('/:id', logger, (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invlid post ID' });
  }

  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content } = req.body;
  if (!title && !content) {
    return res
      .status(400)
      .json({ error: 'You need to enter title or content' });
  }

  posts[postIndex] = { ...posts[postIndex], title, content };
  res.status(200).json(posts[postIndex]);
});

// Delete a post
router.delete('/:id', logger, (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const deletedPost = posts.splice(postIndex, 1);
  res.status(200).json({ message: 'Post deleted', data: deletedPost });
});

export default router;
