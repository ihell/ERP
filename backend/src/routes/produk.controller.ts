import express from "express";
import {
  getAllProduk,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controllers/produk.controller";

const router = express.Router();

router.get("/", getAllProduk);
router.post("/", createProduk);
router.put("/:id", updateProduk);
router.delete("/:id", deleteProduk);

export default router;
