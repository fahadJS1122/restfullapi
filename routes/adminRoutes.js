const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { authenticateAdmin } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const router = express.Router();

// POST /admin/register

router.get('/', (req, res) => {
    res.send('Admin dashboard');
  });



  router.post('/', (req, res) => {
    // Logic to handle POST requests
    res.send('Admin POST request received');
  });


router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
