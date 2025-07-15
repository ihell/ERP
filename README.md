# Backend ERP Project

Backend sederhana untuk aplikasi ERP menggunakan **Node.js**, **Express**, dan **TypeScript**.

## Fitur

- API produk sederhana (`/produk`)
- Middleware CORS
- Parsing JSON request body

## Struktur Folder

```
backend/
├── src/
│   ├── index.ts
│   └── routes/
│       └── produk.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Instalasi

1. **Clone repository**  
   ```sh
   git clone <repo-url>
   cd backend
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

## Menjalankan Server

```sh
npm run dev
```

Server akan berjalan di [http://localhost:3000](http://localhost:3000).

##