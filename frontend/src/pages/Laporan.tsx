import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";

interface Laporan {
  id: number;
  nama: string;
  jumlah: number;
  total_harga: number;
  tanggal: string;
}

export default function Laporan() {
  const [laporan, setLaporan] = useState<Laporan[]>([]);

  const fetchLaporan = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/laporan");
      setLaporan(res.data);
    } catch (err) {
      console.error("Gagal ambil data laporan", err);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📊 Laporan Penjualan</h1>
      <div className="overflow-x-auto bg-white border rounded-xl shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Total Harga</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {laporan.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.jumlah}</TableCell>
                <TableCell>Rp {item.total_harga.toLocaleString()}</TableCell>
                <TableCell>{new Date(item.tanggal).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
