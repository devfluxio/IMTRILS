require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in environment');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const sample = new Product({
    title: 'ComfortFit Everyday Bra',
    description: 'Soft, breathable everyday bra with light padding and no underwire for ultimate comfort.',
    price: 799,
    compareAtPrice: 999,
    sku: 'CF-BRA-001',
    stock: 120,
    images: ['/assets/placeholder.png'],
    categories: ['innerwear', 'bras'],
    tags: ['comfortable', 'everyday'],
    gender: 'women',
    productType: 'bra',
    sizes: ['32A','34A','34B','36B','36C'],
    colors: ['Black','Beige'],
    fabric: 'Cotton blend',
    material: 'Cotton/Spandex',
    care: 'Hand wash cold, line dry',
    fit: 'Regular',
    pattern: 'Solid',
    supportLevel: 'low',
    padding: 'Light',
    wireType: 'None',
    brand: 'ComfortFit',
    seo: { title: 'ComfortFit Everyday Bra', description: 'Lightly padded no-wire bra for daily comfort.' },
    published: true,
    featured: false,
  });

  try {
    const p = await sample.save();
    console.log('Product saved:', p._id.toString());
  } catch (err) {
    console.error('Save error', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
