require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const productsRoutes = require('./routes/products');
const uploadsRoutes = require('./routes/uploads');
const ordersRoutes = require('./routes/orders');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// serve uploaded static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.get('/api/health', (req, res) => res.json({ ok: true }));


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/admin/uploads', uploadsRoutes);
app.use('/api/orders', ordersRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection error', err);
    process.exit(1);
  });
