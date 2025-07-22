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
  const [editMode, setEditMode] = useState(false);
  const [produkEdit, setProdukEdit] = useState<Produk | null>(null);
  const [form, setForm] = useState({ nama: "", harga: "" });
  const [openDialog, setOpenDialog] = useState(false); // <- kontrol dialog
  const [filter, setFilter] = useState("");

  const fetchProduk = async () => {
    try {
      const res = await axios.get("http://localhost:3000/produk");
      setProduk(res.data);
    } catch (err) {
      toast.error("Gagal fetch produk");
      console.error("Gagal fetch produk:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && produkEdit) {
        await axios.put(`http://localhost:3000/api/produk/${produkEdit.id}`, {
          nama: form.nama,
          harga: parseInt(form.harga),
        });
        toast.success("Produk berhasil diperbarui");
      } else {
        await axios.post("http://localhost:3000/api/produk", {
          nama: form.nama,
          harga: parseInt(form.harga),
        });
        toast.success("Produk berhasil ditambahkan");
      }
      setEditMode(false);
      setProdukEdit(null);
      setForm({ nama: "", harga: "" });
      setOpenDialog(false); // tutup dialog setelah submit
      fetchProduk();
    } catch (error) {
      console.error("❌ Gagal tambah/edit produk:", error);
      toast.error("Gagal tambah/edit produk");
    }
  };

  const handleHapusProduk = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/produk/${id}`);
      toast.success("Produk berhasil dihapus");
      fetchProduk();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus produk");
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // Filter produk sebelum render
  const filteredProduk = produk.filter((p) =>
    p.nama.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📦 Daftar Produk</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setForm({ nama: "", harga: "" });
                setEditMode(false);
                setProdukEdit(null);
                setOpenDialog(true);
              }}
            >
              ➕ Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-2xl shadow-xl border border-gray-200 bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                {editMode ? "Edit Produk" : "Tambah Produk Baru"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Produk</Label>
                <Input
                  id="nama"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="Contoh: Meja"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="harga">Harga</Label>
                <Input
                  id="harga"
                  type="number"
                  value={form.harga}
                  onChange={(e) => setForm({ ...form, harga: e.target.value })}
                  placeholder="Contoh: 500000"
                />
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editMode ? "Update" : "Simpan"}
                </Button>
                {editMode && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditMode(false);
                      setProdukEdit(null);
                      setForm({ nama: "", harga: "" });
                      setOpenDialog(false);
                    }}
                  >
                    Batal
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tambahkan input filter sebelum tabel */}
      <Input
        type="text"
        placeholder="Cari produk..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-xs"
      />

      <div className="rounded-xl border shadow-sm overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProduk.map((p, idx) => (
              <TableRow key={p.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{p.nama}</TableCell>
                <TableCell>Rp {p.harga.toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => {
                      setProdukEdit(p);
                      setEditMode(true);
                      setForm({
                        nama: p.nama,
                        harga: p.harga.toString(),
                      });
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => handleHapusProduk(p.id)}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
