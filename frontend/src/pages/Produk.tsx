import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Produk() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/produk')
      .then(res => setProduk(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <ul className="space-y-2">
        {produk.map((p: any) => (
          <li key={p.id} className="bg-white p-2 rounded shadow">
            {p.nama} - Rp {p.harga.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
