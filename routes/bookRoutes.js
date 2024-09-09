const express = require('express');
const Book = require('../models/Book');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /books
  router.get('/', (req, res) => {
    res.send('Books API is working!');
  });

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /books

router.post('/', (req, res) => {
    // Handle POST request logic here
    res.send('POST request to /booksapi');
  });


router.post('/', verifyAdmin, async (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const book = new Book({ title, author, year });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /books/:id

router.put('/', (req, res) => {
    // Handle PUT request logic
    res.send('PUT request to ');
  });


router.put('/:id', verifyAdmin, async (req, res) => {
  const { title, author, year } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { title, author, year }, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /books/:id

router.delete('/', (req, res) => {
    // Handle PUT request logic
    res.send('delete this request  ');
  });
  
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
