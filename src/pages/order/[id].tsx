import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PrimaryLayout } from '@/layouts';
import { OrderProgressBar } from '@/components/ui';
import type { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

const OrderPage = () => {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    postalCode: '',
    quantity: 1,
    color: '',
    size: '',
  });

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    // Validate form
    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      alert('Please fill all required fields');
      return;
    }

    // Determine color/size: use selected or default from product
    const color = form.color || (Array.isArray(product.colors) && product.colors.length > 0 ? product.colors[0] : '');
    const size = form.size || (Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes[0] : '');

    // Save order data to sessionStorage and redirect to checkout
    const orderData = {
      productId: product._id,
      productTitle: product.title,
      productPrice: product.price,
      productImage: (product.images && product.images.length > 0) ? product.images[0] : '/assets/hero.webp',
      quantity: form.quantity,
      color,
      size,
      customerDetails: form,
      orderDate: new Date().toISOString(),
      orderNumber: `ORD-${Date.now()}`,
    };
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    router.push('/checkout');
  };

  if (!product) return <div className="p-8">{loading ? 'Loading...' : 'Product not found'}</div>;

  return (
    <div className="container mx-auto p-4">
      <OrderProgressBar current="order" />
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-neutral-600">
        <Link href={`/product/${id}`} className="text-blue-600 hover:underline">Product</Link> &gt; <span className="font-semibold">Order</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Summary */}
        <div className="lg:col-span-1">
          <div className="rounded border p-4 bg-white sticky top-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="mb-4">
              <Image
                src={product.images && product.images.length > 0 ? product.images[0] : '/assets/hero.webp'}
                alt={product.title}
                width={200}
                height={200}
                className="w-full rounded"
              />
            </div>
            <h4 className="font-medium text-sm">{product.title}</h4>
            <p className="text-neutral-600 text-sm mt-1">{product.brand}</p>
            <div className="my-3 flex justify-between items-center border-t pt-3">
              <span>Price:</span>
              <span className="font-bold">₹{product.price}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span>Quantity:</span>
              <span className="font-bold">{form.quantity}</span>
            </div>
            <div className="my-3 flex justify-between items-center text-lg font-bold border-t pt-3">
              <span>Total:</span>
              <span>₹{(product.price * form.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Details Form */}
        <div className="lg:col-span-2">
          <div className="rounded border p-6 bg-white">
            <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>
            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Mumbai"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="123 Main Street, Apt 4B"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Near Central Park"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="400001"
                  />
                </div>
              </div>

              {/* Size selection */}
              {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Size</label>
                  <select
                    name="size"
                    value={form.size || product.sizes[0]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    {product.sizes.map((size: string) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Color selection */}
              {Array.isArray(product.colors) && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Color</label>
                  <select
                    name="color"
                    value={form.color || product.colors[0]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    {product.colors.map((color: string) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <select
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  {[1, 2, 3, 4, 5].map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-neutral-900 transition"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en')),
    },
  };
}

OrderPage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout seo={{ title: 'Order', description: 'Place your order' }}>{page}</PrimaryLayout>;
};

export default OrderPage;
