# ERP Project

ERP sederhana dengan stack **Node.js**, **Express**, **TypeScript** (Backend), **React + Vite + Tailwind CSS** (Frontend), dan **PostgreSQL** (Database).

---

## Teknologi yang Digunakan

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [pg](https://node-postgres.com/) (PostgreSQL client)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [clsx](https://www.npmjs.com/package/clsx)
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)

### Database
- [PostgreSQL](https://www.postgresql.org/)

---

## Fitur

- API produk sederhana (`/produk`)
- Middleware CORS
- Parsing JSON request body
- Frontend modern dengan React & Tailwind CSS

## Struktur Folder

```
backend/
├── src/
│   ├── index.ts
│   ├── db.ts
│   └── routes/
│       └── produk.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md

frontend/
├── src/
│   ├── App.tsx
│   ├── pages/
│   ├── components/
│   └── lib/
│       └── utils.ts
├── index.css
├── package.json
├── tsconfig.json
└── ...
```

---

## Instalasi

### 1. Clone repository  
```sh
git clone <repo-url>
cd erp-project
```

### 2. Setup Backend  
```sh
cd backend
cp .env.example .env   # Edit .env sesuai konfigurasi database Anda
npm install
npm run dev
```

### 3. Setup Frontend  
Buka terminal baru:
```sh
cd frontend
npm install
npm run dev
```

---

## Menjalankan Server

- **Backend:** [http://localhost:3000](http://localhost:3000)
- **Frontend:** [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Database

Gunakan PostgreSQL dan buat tabel produk seperti berikut:

```sql
CREATE TABLE produk (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  harga NUMERIC NOT NULL
);
```