const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  sku: { type: String, index: true },
  price: { type: Number },
  compareAtPrice: { type: Number },
  stock: { type: Number, default: 0 },
  size: { type: String },
  color: { type: String },
  images: [{ type: String }],
  barcode: { type: String },
});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  description: { type: String },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  sku: { type: String, index: true },
  variants: [VariantSchema],
  images: [{ type: String }],
  categories: [{ type: String }],
  tags: [{ type: String }],
  brand: { type: String },
  material: { type: String },
  care: { type: String },
  fabric: { type: String },
  fit: { type: String },
  pattern: { type: String },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  gender: { type: String, enum: ['men', 'women', 'unisex', 'kids'], default: 'unisex' },
  productType: { type: String },
  supportLevel: { type: String },
  padding: { type: String },
  wireType: { type: String },
  stock: { type: Number, default: 0 },
  barcode: { type: String },
  weight: { type: Number },
  dimensions: {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
  },
  seo: {
    title: { type: String },
    description: { type: String },
  },
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProductSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
