const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_fallback_key_for_dev_only_please_change';

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ─── Database Setup ──────────────────────────────────────────────────────────
// Creates a free local SQLite file — no cloud, no payment needed!
const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const db = new Database(path.join(dbDir, 'veertrons.db'));

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// ─── Create Tables ────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS donations (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name  TEXT    NOT NULL,
    last_name   TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    amount      REAL    NOT NULL,
    type        TEXT    NOT NULL DEFAULT 'one-time',
    status      TEXT    NOT NULL DEFAULT 'pending',
    message     TEXT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    email      TEXT    NOT NULL,
    subject    TEXT,
    message    TEXT    NOT NULL,
    status     TEXT    NOT NULL DEFAULT 'unread',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT    UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admins (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed default admin if none exists
const adminCheck = db.prepare('SELECT COUNT(*) as count FROM admins').get();
if (adminCheck.count === 0) {
  const hash = bcrypt.hashSync('Admin@123', 10);
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hash);
  console.log('⚠️  Default admin created. Username: admin | Password: Admin@123');
}

console.log('✅ SQLite database initialized at: server/data/veertrons.db');

// ─── Authentication Middleware ────────────────────────────────────────────────
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

// ─── ADMIN AUTH ROUTES ───────────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = bcrypt.compareSync(password, admin.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── DONATION ROUTES ─────────────────────────────────────────────────────────

// POST /api/donations — Save a new donation
app.post('/api/donations', (req, res) => {
  const { first_name, last_name, email, amount, type, message } = req.body;

  if (!first_name || !last_name || !email || !amount) {
    return res.status(400).json({ error: 'Missing required fields: first_name, last_name, email, amount' });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO donations (first_name, last_name, email, amount, type, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(first_name, last_name, email, parsedAmount, type || 'one-time', message || null);

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully! Thank you for your generosity.',
      id: info.lastInsertRowid,
    });
  } catch (err) {
    console.error('Donation insert error:', err);
    res.status(500).json({ error: 'Failed to record donation' });
  }
});

// GET /api/donations — List all donations (admin use)
app.get('/api/donations', authenticateAdmin, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM donations ORDER BY created_at DESC').all();
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// ─── CONTACT ROUTES ───────────────────────────────────────────────────────────

// POST /api/contact — Save a contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(name, email, subject || null, message);

    res.status(201).json({
      success: true,
      message: 'Your message has been received! We will get back to you soon.',
      id: info.lastInsertRowid,
    });
  } catch (err) {
    console.error('Contact insert error:', err);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

// GET /api/contact — List all messages (admin use)
app.get('/api/contact', authenticateAdmin, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// ─── NEWSLETTER SUBSCRIBE ─────────────────────────────────────────────────────

// POST /api/subscribe
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const stmt = db.prepare('INSERT OR IGNORE INTO subscribers (email) VALUES (?)');
    const info = stmt.run(email);

    if (info.changes === 0) {
      return res.json({ success: true, message: 'You are already subscribed!' });
    }
    res.status(201).json({ success: true, message: 'Successfully subscribed to our newsletter!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  const donationCount = db.prepare('SELECT COUNT(*) as count FROM donations').get();
  const contactCount = db.prepare('SELECT COUNT(*) as count FROM contacts').get();
  const subCount = db.prepare('SELECT COUNT(*) as count FROM subscribers').get();

  res.json({
    status: 'ok',
    database: 'SQLite (local, free)',
    stats: {
      donations: donationCount.count,
      contacts: contactCount.count,
      subscribers: subCount.count,
    },
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Veertrons backend running at: http://localhost:${PORT}`);
  console.log(`📊 Health check:  http://localhost:${PORT}/api/health`);
  console.log(`💰 Donations API: http://localhost:${PORT}/api/donations`);
  console.log(`📧 Contact API:   http://localhost:${PORT}/api/contact`);
  console.log(`\n💡 Database is 100% FREE — stored locally in server/data/veertrons.db\n`);

  // Prevent server from sleeping (for free tier hosting like Render)
  if (process.env.RENDER_EXTERNAL_URL) {
    const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
    setInterval(() => {
      fetch(`${process.env.RENDER_EXTERNAL_URL}/api/health`)
        .then(res => console.log(`[Self-Ping] Status: ${res.status} - Keeping server awake!`))
        .catch(err => console.error('[Self-Ping] Error:', err.message));
    }, PING_INTERVAL);
    console.log(`⏰ Self-ping scheduled every 14 minutes for ${process.env.RENDER_EXTERNAL_URL}`);
  }
});
