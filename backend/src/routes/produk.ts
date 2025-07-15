import express from 'express';
import { pool } from '../db';

const router = express.Router();

// GET semua produk
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produk');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error mengambil produk:', err); // Tambah log ini
    res.status(500).json({ message: 'Gagal mengambil produk' });
  }
});

// ✅ Tambah produk baru
router.post('/', async (req, res) => {
  const { nama, harga } = req.body;

  if (!nama || !harga) {
    return res.status(400).json({ message: 'Nama dan harga wajib diisi' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO produk (nama, harga) VALUES ($1, $2) RETURNING *',
      [nama, harga]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambahkan produk' });
  }
});

export default router;
