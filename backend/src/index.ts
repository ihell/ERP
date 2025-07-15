import express from 'express';
import cors from 'cors';
import produkRoutes from './routes/produk';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/produk', produkRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
