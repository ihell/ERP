import { Request, Response } from "express";
import { pool } from "../db"; 

// Get all products
export const getAllProduk = async (_req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM produk");
  res.json(result.rows);
};

// Create new product
export const createProduk = async (req: Request, res: Response) => {
  const { nama, harga } = req.body;
  const result = await pool.query(
    "INSERT INTO produk (nama, harga) VALUES ($1, $2) RETURNING *",
    [nama, harga]
  );
  res.json(result.rows[0]);
};

// Update product
export const updateProduk = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama, harga } = req.body;
  const result = await pool.query(
    "UPDATE produk SET nama = $1, harga = $2 WHERE id = $3 RETURNING *",
    [nama, harga, id]
  );
  res.json(result.rows[0]);
};

// Delete product
export const deleteProduk = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query("DELETE FROM produk WHERE id = $1", [id]);
  res.json({ message: "Produk deleted" });
};
