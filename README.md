# E-Commerce MERN App

**Deskripsi:**
Project ini adalah aplikasi e-commerce menggunakan stack MERN (MongoDB, Express.js, React.js, Node.js) dengan fitur user dan admin, termasuk login/register, browse product, cart, checkout dengan payment gateway (Midtrans), serta admin panel untuk mengelola produk, user, dan transaksi.

---

## 🔹 Fitur

### User

* Browse product (search & filter)
* Product detail
* Add to cart
* Checkout & process payment (Midtrans)
* Login / Register
* Riwayat transaksi user

### Admin

* Admin panel untuk mengelola:

  * Produk (CRUD)
  * User (list, block/unblock, ubah role)
  * Transaksi (lihat, update status)
* Dashboard overview (total user, transaksi, produk)

---

## 🔹 Requirement

* Node.js >= 18
* npm / yarn
* MongoDB (local / Atlas)
* Midtrans sandbox account

---

## 🔹 Setup & Install

1. Clone repo:

```bash
git clone https://github.com/username/ecommerce-app.git
cd ecommerce-app
```

2. Install dependencies:

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. Buat file `.env` di `server/`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_jwt_secret
```

---

## 🔹 Run Project

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm start
```

---

## 🔹 Struktur Folder

```
server/
 ├─ controllers/
 │   └─ authController.js
 ├─ models/
 │   └─ User.js
 ├─ routes/
 │   └─ auth.js
 ├─ index.js
 └─ .env

client/
 ├─ src/
 │   ├─ pages/
 │   ├─ components/
 │   ├─ redux/
 │   └─ App.jsx
 └─ package.json
```

---

## 🔹 API Endpoints

### Auth

| Method | Route              | Description   | Body                            |
| ------ | ------------------ | ------------- | ------------------------------- |
| POST   | /api/auth/register | Register user | { "name", "email", "password" } |
| POST   | /api/auth/login    | Login user    | { "email", "password" }         |

*Response success (login/register):*

```json
{
  "message": "Login/Register berhasil",
  "user": {
    "id": "userId",
    "name": "Hanif",
    "email": "hanif@gmail.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

### Products

| Method | Route              | Description                | Body                                                                                           | Auth  |
| ------ | ------------------ | -------------------------- | ---------------------------------------------------------------------------------------------- | ----- |
| POST   | /api/products      | Create product (admin only) | { "name": "Keyboard", "description": "desc", "price": 750000, "category": "Electronics", "stock": 20 } | Admin |
| GET    | /api/products      | Get all products           | -                                                                                              | Public|
| GET    | /api/products/:id  | Get product detail         | -                                                                                              | Public|
| PUT    | /api/products/:id  | Update product (admin only) | { "name": "New name", "price": 800000 }                                                        | Admin |
| DELETE | /api/products/:id  | Delete product (admin only) | -                                                                                              | Admin |

*Response success (create product):*

```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "689ddd9291afc4cf4cbfaa63",
    "name": "Keyboard Mechanical",
    "description": "Keyboard mechanical RGB blue switch",
    "price": 750000,
    "category": "Electronics",
    "stock": 20,
    "images": [],
    "createdBy": "689ddca291afc4cf4cbfaa5e",
    "createdAt": "2025-08-14T12:58:58.516Z",
    "updatedAt": "2025-08-14T12:58:58.516Z"
  }
}
```

> Note: Untuk create/update/delete product, login sebagai admin dan sertakan token di Authorization: Bearer <jwt>

> Catatan: update endpoint lain (products, cart, orders, admin) sambil coding

---

## 🔹 Deployment

* Backend: Render / Railway / VPS
* Frontend: Vercel / Netlify
* Database: MongoDB Atlas / local

---

## 🔹 Catatan

* Semua API aman dengan JWT + role check
* Admin panel hanya bisa diakses oleh admin
* Payment gateway awal pakai sandbox untuk testing
