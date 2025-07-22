import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Dummy admin
const ADMIN = { username: 'admin', password: 'admin123' };

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign({ username }, 'SECRET_KEY', { expiresIn: '1h' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Username atau password salah' });
});

export default router;
