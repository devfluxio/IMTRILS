# Shopsphere Backend

Minimal Node.js + Express backend for Shopsphere (MongoDB auth endpoints).

Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
cd server
npm install
```

3. Run in development:

```bash
npm run dev
```

API endpoints

- `GET /api/health` — healthcheck
- `POST /api/auth/signup` — body: `{ name, email, password }`
- `POST /api/auth/signin` — body: `{ email, password }`

Admin setup

- Set `ADMIN_EMAIL` in `.env` to the email you want to become admin. When that address signs up, the account will receive the `admin` role.

Admin API (requires Bearer token from signin)

- `GET /api/admin/products` — list products
- `POST /api/admin/products` — create product (body: product fields)
- `PUT /api/admin/products/:id` — update product
- `DELETE /api/admin/products/:id` — delete product
