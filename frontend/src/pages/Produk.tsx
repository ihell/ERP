import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Produk {
  id: number;
  nama: string;
  harga: number;
}

export default function Produk() {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const fetchProduk = async () => {
    try {
      const res = await axios.get("http://localhost:3000/produk");
      setProduk(res.data);
    } catch (err) {
      toast.error("Gagal fetch produk");
      console.error("Gagal fetch produk:", err);
    }
  };

  const tambahProduk = async () => {
    try {
      await axios.post("http://localhost:3000/api/produk", {
        nama,
        harga: Number(harga),
      });
      toast.success("Produk berhasil ditambahkan 🎉");

      setNama("");
      setHarga("");
      fetchProduk();
    } catch (err) {
      console.error("Gagal tambah produk:", err);
      toast.error("Gagal menambahkan produk 😢");
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📦 Daftar Produk</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>➕ Tambah Produk</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-2xl shadow-xl border border-gray-200 bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                Tambah Produk Baru
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-sm text-gray-600">
                  Nama Produk
                </Label>
                <Input
                  id="nama"
                  className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  placeholder="Contoh: Keyboard Mechanical"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="harga" className="text-sm text-gray-600">
                  Harga
                </Label>
                <Input
                  id="harga"
                  type="number"
                  className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  placeholder="Contoh: 250000"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={tambahProduk}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-xl border shadow-sm overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produk.map((p, idx) => (
              <TableRow key={p.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{p.nama}</TableCell>
                <TableCell>Rp {p.harga.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
