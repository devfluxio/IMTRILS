
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, requireAdmin } = require('../middleware/auth');
const { sendVerificationEmail } = require('../utils/mailer');
const crypto = require('crypto');

// Verify admin token endpoint
router.get('/verify-admin', auth, requireAdmin, (req, res) => {
  res.json({ ok: true, admin: true });
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const role = process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const user = new User({ name, email, password: hash, role, verified: false, verifyToken });
    await user.save();
    await sendVerificationEmail(email, verifyToken);
    res.json({ message: 'Signup successful, please verify your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.verified) return res.status(403).json({ message: 'Please verify your email before signing in.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Email verification endpoint (moved outside of /signin)
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  console.log('Verify email called with token:', token);
  if (!token) {
    console.log('No token provided');
    return res.status(400).json({ message: 'Invalid verification link.' });
  }
  const user = await User.findOne({ verifyToken: token });
  if (!user) {
    console.log('No user found for token:', token);
    return res.status(400).json({ message: 'Invalid or expired verification link.' });
  }
  if (user.verified) {
    console.log('User already verified:', user.email);
    return res.status(400).json({ message: 'Email already verified.' });
  }
  user.verified = true;
  user.verifyToken = undefined;
  await user.save();
  console.log('User verified successfully:', user.email);
  res.json({ message: 'Email verified successfully. You can now sign in.' });
});

module.exports = router;
