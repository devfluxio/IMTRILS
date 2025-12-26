const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// POST /api/orders - Place a new order
router.post('/', async (req, res) => {
  try {
    const orderData = req.body;
    // Validate required fields
    if (!orderData.productId || !orderData.customerDetails?.email || !orderData.customerDetails?.phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Save order to DB
    const order = new Order(orderData);
    await order.save();

    // Send email to admin
    await sendOrderEmailToAdmin(order);
    // Send email to customer
    await sendOrderEmailToCustomer(order);
    // TODO: Send SMS to customer (implement with SMS API)

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error('Order placement error:', err);
    res.status(500).json({ error: 'Order placement failed' });
  }
});

// Email helpers
async function sendOrderEmailToAdmin(order) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'sujeet.sharrma01@gmail.com',
    subject: `New Order Received: ${order.orderNumber}`,
    html: `<h2>New Order Placed</h2>
      <p><b>Product:</b> ${order.productTitle}</p>
      <p><b>Quantity:</b> ${order.quantity}</p>
      <p><b>Customer:</b> ${order.customerDetails.name} (${order.customerDetails.email}, ${order.customerDetails.phone})</p>
      <p><b>Address:</b> ${order.customerDetails.address}, ${order.customerDetails.city} - ${order.customerDetails.postalCode}</p>
      <p><b>Order Number:</b> ${order.orderNumber}</p>
      <p><b>Order Date:</b> ${order.orderDate}</p>`
  };
  await transporter.sendMail(mailOptions);
}

async function sendOrderEmailToCustomer(order) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: order.customerDetails.email,
    subject: `Order Confirmation: ${order.orderNumber}`,
    html: `<h2>Thank you for your order!</h2>
      <p>Your order <b>${order.orderNumber}</b> has been placed successfully.</p>
      <p><b>Product:</b> ${order.productTitle}</p>
      <p><b>Quantity:</b> ${order.quantity}</p>
      <p><b>Total:</b> ₹${order.productPrice * order.quantity}</p>
      <p>We will deliver your order to:</p>
      <p>${order.customerDetails.address}, ${order.customerDetails.city} - ${order.customerDetails.postalCode}</p>
      <p>For any queries, contact us at support@example.com</p>`
  };
  await transporter.sendMail(mailOptions);
}

module.exports = router;
