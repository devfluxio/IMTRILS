require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const products = await Product.find().lean();
  console.log('Total products in DB:', products.length);
  products.forEach((p, i) => {
    console.log(i + 1, 'id=', p._id.toString(), 'title=', p.title || p.name, 'gender=', p.gender, 'published=', p.published);
  });
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
