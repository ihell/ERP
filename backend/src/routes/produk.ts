import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json([
    { id: 1, nama: 'Produk A', harga: 10000 },
    { id: 2, nama: 'Produk B', harga: 20000 }
  ]);
});

export default router;
