const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productTitle: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String },
  color: { type: String },
  size: { type: String },
  quantity: { type: Number, required: true },
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String },
  },
  orderDate: { type: Date, default: Date.now },
  orderNumber: { type: String, required: true },
  paymentMethod: { type: String },
  paymentDate: { type: Date },
  status: { type: String, default: 'placed' },
});

module.exports = mongoose.model('Order', OrderSchema);
