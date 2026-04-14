const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MathUtils = process.env.JWT_SECRET || 'super_secret_fallback_key_for_dev_only_please_change';
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_fallback_key_for_dev_only_please_change';

// ─── CORS ────────────────────────────────────────────────────────────────────
const defaultAllowedOrigins = [
  'http://localhost:5173',
];

const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_ORIGIN || defaultAllowedOrigins.join(','))
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); 
      if (allowedOrigins.includes('*')) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      if (origin.endsWith('.up.railway.app') || origin.endsWith('.vercel.app')) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json());

// ─── Database Setup (MongoDB) ────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/veertrons';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ─── Mongoose Schemas & Models ────────────────────────────────────────────────
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});
const Admin = mongoose.model('Admin', adminSchema);

const donationSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, default: 'one-time' },
  status: { type: String, default: 'pending' },
  message: { type: String },
  created_at: { type: Date, default: Date.now }
});
const Donation = mongoose.model('Donation', donationSchema);

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'unread' },
  created_at: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now }
});
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Seed default admin if none exists
Admin.countDocuments().then(count => {
  if (count === 0) {
    const hash = bcrypt.hashSync('Admin@123', 10);
    Admin.create({ username: 'admin', password_hash: hash }).then(() => {
      console.log('⚠️  Default admin created. Username: admin | Password: Admin@123');
    });
  }
});

// ─── Auth Middleware ──────────────────────────────────────────────────────────
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ─── ADMIN AUTH ───────────────────────────────────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = bcrypt.compareSync(password, admin.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── DONATIONS ────────────────────────────────────────────────────────────────
app.post('/api/donations', async (req, res) => {
  const { first_name, last_name, email, amount, type, message } = req.body;

  if (!first_name || !last_name || !email || !amount) {
    return res.status(400).json({ error: 'Missing required fields: first_name, last_name, email, amount' });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  try {
    const newDonation = await Donation.create({
      first_name, last_name, email, amount: parsedAmount, type: type || 'one-time', message: message || null
    });
    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully! Thank you for your generosity.',
      id: newDonation._id,
    });
  } catch (err) {
    console.error('Donation insert error:', err);
    res.status(500).json({ error: 'Failed to record donation' });
  }
});

app.get('/api/donations', authenticateAdmin, async (req, res) => {
  try {
    // Return lean objects to match old SQLite row shapes 
    const rows = await Donation.find().sort({ created_at: -1 }).lean();
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// ─── CONTACTS ─────────────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  try {
    const newContact = await Contact.create({
      name, email, subject: subject || null, message
    });
    res.status(201).json({
      success: true,
      message: 'Your message has been received! We will get back to you soon.',
      id: newContact._id,
    });
  } catch (err) {
    console.error('Contact insert error:', err);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

app.get('/api/contact', authenticateAdmin, async (req, res) => {
  try {
    const rows = await Contact.find().sort({ created_at: -1 }).lean();
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.json({ success: true, message: 'You are already subscribed!' });
    }
    await Subscriber.create({ email });
    res.status(201).json({ success: true, message: 'Successfully subscribed to our newsletter!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const donationCount = await Donation.countDocuments();
    const contactCount  = await Contact.countDocuments();
    const subCount      = await Subscriber.countDocuments();

    res.json({
      status: 'ok',
      database: 'MongoDB',
      stats: {
        donations: donationCount,
        contacts: contactCount,
        subscribers: subCount,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Database unavailable' });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Veertrons backend running at: http://localhost:${PORT}`);
  console.log(`📊 Health check:  http://localhost:${PORT}/api/health`);
  console.log(`💰 Donations API: http://localhost:${PORT}/api/donations`);
  console.log(`📧 Contact API:   http://localhost:${PORT}/api/contact\n`);
});
