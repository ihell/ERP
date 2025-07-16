import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // PENTING: harus ada!

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Endpoint root
app.get('/', (_req, res) => {
  res.send('✅ Backend ERP API aktif!');
});

// Endpoint ambil semua produk
app.get('/produk', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produk');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil produk' });
  }
});

// Endpoint tambah produk (untuk frontend)
app.post("/api/produk", async (req, res) => {
  const { nama, harga } = req.body;

  if (!nama || !harga) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  try {
    await pool.query(
      "INSERT INTO produk (nama, harga) VALUES ($1, $2)",
      [nama, harga]
    );
    res.json({ message: "Produk berhasil ditambahkan" });
  } catch (error) {
    console.error("❌ Gagal tambah produk:", error);
    res.status(500).json({ message: "Gagal menambahkan produk" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
