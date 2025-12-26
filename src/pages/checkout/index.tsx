import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { PrimaryLayout } from '@/layouts';
import { OrderProgressBar } from '@/components/ui';
import type { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CheckoutPage = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('orderData');
    if (data) {
      setOrderData(JSON.parse(data));
    } else {
      router.push('/');
    }
  }, [router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    if (!orderData) return;
    try {
      // POST order to backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderData,
          paymentMethod,
          paymentDate: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Order placement failed');
      const data = await res.json();
      // Save order success data to sessionStorage
      sessionStorage.setItem('orderSuccess', JSON.stringify(data.order));
      sessionStorage.removeItem('orderData');
      router.push('/order-success');
    } catch (err) {
      alert('Order placement failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!orderData) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <OrderProgressBar current="payment" />
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-neutral-600">
        <Link href={`/product/${orderData.productId}`} className="text-blue-600 hover:underline">Product</Link> &gt; 
        <Link href={`/order/${orderData.productId}`} className="text-blue-600 hover:underline"> Order</Link> &gt; 
        <span className="font-semibold"> Payment</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded border p-4 bg-white sticky top-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="mb-4">
              <Image
                src={orderData.productImage}
                alt={orderData.productTitle}
                width={180}
                height={180}
                className="w-full rounded"
              />
            </div>
            <h4 className="font-medium text-sm">{orderData.productTitle}</h4>
            <div className="my-3 space-y-2 border-t pt-3 text-sm">
              <div className="flex justify-between">
                <span>Price:</span>
                <span>₹{orderData.productPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{orderData.quantity}</span>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{(orderData.productPrice * orderData.quantity).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-neutral-600 bg-blue-50 p-2 rounded">
              <p><strong>Delivering to:</strong></p>
              <p>{orderData.customerDetails.name}</p>
              <p>{orderData.customerDetails.address}</p>
              <p>{orderData.customerDetails.city} - {orderData.customerDetails.postalCode}</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="rounded border p-6 bg-white">
            <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
            <form onSubmit={handlePayment}>
              <div className="space-y-4 mb-6">
                <label className="flex items-center border p-3 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-3">Credit/Debit Card</span>
                </label>

                <label className="flex items-center border p-3 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-3">UPI (Google Pay, PhonePe, etc.)</span>
                </label>

                <label className="flex items-center border p-3 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-3">Net Banking</span>
                </label>

                <label className="flex items-center border p-3 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-3">Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod !== 'cod' && (
                <div className="mb-6 p-4 bg-blue-50 rounded text-sm text-neutral-600">
                  <p>This is a demo store. No real payment will be processed.</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 border px-4 py-3 rounded font-semibold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 bg-black text-white px-4 py-3 rounded font-semibold hover:bg-neutral-900 transition disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Confirm Payment'}
                </button>
              </div>
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

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout seo={{ title: 'Checkout', description: 'Secure payment' }}>{page}</PrimaryLayout>;
};

export default CheckoutPage;
