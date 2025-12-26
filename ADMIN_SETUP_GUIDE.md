# Admin Panel Setup & Usage Guide

## Prerequisites
- Node.js installed
- MongoDB running locally or Docker

## Step 1: Start MongoDB

**Option A: Local MongoDB (if installed)**
```powershell
# Run as Administrator
net start MongoDB
```

**Option B: Docker (recommended)**
```bash
docker run -d --name shopsphere-mongo -p 27017:27017 -v shopsphere-data:/data/db mongo:6
```

Verify MongoDB is running:
```bash
mongosh # or mongo (older versions)
```

## Step 2: Start Backend

```bash
cd server
npm install
npm run dev
```

Expected output: `Server running on port 5000` and `Connected to MongoDB`

## Step 3: Start Frontend

**In a new terminal:**
```bash
cd shopsphere (root folder)
npm install
npm run dev
```

Expected output: `▲ Next.js x.x.x`

## Step 4: Create Admin Account

### 4a. Sign Up
1. Open http://localhost:3000/signup
2. Fill form:
   - **Name:** Your Name
   - **Email:** admin@shopsphere.com (MUST match ADMIN_EMAIL in server/.env)
   - **Password:** anything (min 6 chars)
   - **Confirm Password:** same
3. Click "Sign Up"
4. **Copy the token** shown on the page (green box)

### 4b. Sign In (Alternative)
If you want to signin instead of signup:
1. Open http://localhost:3000/signin
2. Use same email/password from signup
3. Click "Sign In with Email"
4. **Copy the token** shown

## Step 5: Access Admin Panel

1. Open http://localhost:3000/admin
2. Paste the token in "Bearer Token" input box
3. Click "Load" button
4. You should see "Products" section (empty initially)

## Step 6: Add a Product

Fill the form with sample data:

```
Title: Cotton Bra
Price: 499
Compare At Price: 699
SKU: BRA-001
Stock: 50

Images: https://via.placeholder.com/500x500?text=Bra
Categories: Womens, Bras
Tags: cotton, comfortable
Sizes: 30A, 32B, 34C, 36D
Colors: Black, White, Nude

Brand: MyBrand
Material: Cotton
Care: Hand wash cold
Gender: Women
Fit: Regular
Fabric: Cotton Blend
Pattern: Solid
Product Type: Bra
Support Level: Medium
Padding: Light
Wire Type: Underwire

Weight: 50
Width: 20
Height: 15
Depth: 10

SEO Title: Best Cotton Bra - Comfortable & Affordable
SEO Description: High quality cotton bra for daily wear

Published: ✓ (checked)
Featured: (unchecked)
```

Click "Create" → Product appears in list below!

## Step 7: Edit / Delete Products

- **Edit:** Click "Edit" button on product → Form populates → Modify → Click "Update"
- **Delete:** Click "Delete" button → Confirm → Product removed

## Troubleshooting

| Issue | Fix |
|-------|-----|
| MongoDB connection error | Start MongoDB (Step 1) |
| Backend not starting | Ensure MongoDB is running, check port 5000 is free |
| Frontend won't load | Check `npm run dev` is running in root folder |
| Token not showing after signup | Check browser console (F12), ensure backend is responding |
| Products not saving | Verify token is valid, check server console for errors |
| CORS errors | Ensure `NEXT_PUBLIC_API_BASE=http://localhost:5000` or unset (default) |

## File Structure

```
server/
  .env                 ← Backend config (MongoDB, JWT, Admin email)
  src/
    index.js          ← Express server
    models/Product.js  ← Product schema
    routes/admin.js    ← Admin endpoints
    routes/auth.js     ← Auth endpoints

src/pages/
  signup.tsx          ← Create account
  signin.tsx          ← Login & get token
  admin/index.tsx     ← Admin panel
```

## API Reference (if debugging)

| Endpoint | Method | Requires Auth | Purpose |
|----------|--------|---------------|---------|
| /api/auth/signup | POST | No | Create account |
| /api/auth/signin | POST | No | Get token |
| /api/admin/products | GET | Yes | List products |
| /api/admin/products | POST | Yes | Create product |
| /api/admin/products/:id | PUT | Yes | Update product |
| /api/admin/products/:id | DELETE | Yes | Delete product |

Example request:
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shopsphere.com","password":"mypass"}'
```

Response:
```json
{"token":"eyJ...","user":{"id":"...","email":"...","role":"admin"}}
```

## Important Notes

- Token expires in **7 days** — you'll need to signin again after
- Variants JSON format (optional):
  ```json
  [
    {"sku":"S-BLACK","size":"S","color":"Black","price":499,"stock":20},
    {"sku":"M-BLACK","size":"M","color":"Black","price":499,"stock":15}
  ]
  ```
- Images should be full URLs (http://... or https://...)
- All field values except title and price are optional

## Ready to Add Products? ✅

Once you see the token and can load the admin panel, you're ready to add product data!

