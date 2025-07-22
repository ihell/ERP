import { Router } from "express";
import { pool } from "../db"; 

const router = Router();

// Ambil semua penjualan + produk
router.get("/laporan", async (req, res) => {
  try {
    const laporan = await pool.query(`
      SELECT p.id, pr.nama, p.jumlah, p.total_harga, p.tanggal
      FROM penjualan p
      JOIN produk pr ON p.produk_id = pr.id
      ORDER BY p.tanggal DESC
    `);
    res.json(laporan.rows);
  } catch (err) {
    console.error("❌ Gagal ambil laporan:", err);
    res.status(500).json({ error: "Gagal ambil laporan penjualan" });
  }
});

export default router;
