import express from 'express';
import cors from 'cors'; 
import { pool } from './db';
import produkRoutes from './routes/produk.controller';
import authRoutes from './routes/auth.routes'; // tambahkan import ini
import laporanRoutes from './routes/laporan.routes';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('✅ Backend ERP API aktif!');
});

// Endpoint GET semua produk
app.get('/produk', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produk');
    console.log("📦 Data produk:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error ambil produk:", err);
    res.status(500).json({ message: 'Gagal mengambil produk' });
  }
});

// Endpoint tambahan
app.use('/api/produk', produkRoutes);
app.use('/auth', authRoutes);
app.use("/api", laporanRoutes);

app.listen(3000, () => {
  console.log('🚀 Backend running at http://localhost:3000');
});
