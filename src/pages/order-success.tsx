import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { PrimaryLayout } from '@/layouts';
import { OrderProgressBar } from '@/components/ui';
import type { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OrderSuccessPage = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('orderSuccess');
    if (data) {
      setOrderData(JSON.parse(data));
    } else {
      router.push('/');
    }
  }, [router]);

  if (!orderData) return <div className="p-8">Loading...</div>;

  const estimatedDelivery = new Date(orderData.orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="container mx-auto p-4">
      <OrderProgressBar current="success" />
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="rounded border bg-green-50 p-6 mb-6 text-center">
          <div className="text-5xl mb-3">✓</div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">Order Placed Successfully!</h1>
          <p className="text-neutral-600">Thank you for shopping with us</p>
        </div>

        {/* Order Number */}
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6 text-center">
          <p className="text-sm text-neutral-600">Order Number</p>
          <p className="text-2xl font-bold">{orderData.orderNumber}</p>
          <p className="text-xs text-neutral-500 mt-1">Placed on {new Date(orderData.orderDate).toLocaleDateString()}</p>
        </div>

        {/* Order Details */}
        <div className="rounded border p-6 mb-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="sm:col-span-1">
              <Image
                src={orderData.productImage}
                alt={orderData.productTitle}
                width={120}
                height={120}
                className="w-full rounded"
              />
            </div>
            <div className="sm:col-span-3">
              <h3 className="font-semibold text-lg">{orderData.productTitle}</h3>
              <div className="space-y-2 mt-3 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Unit Price:</span>
                  <span>₹{orderData.productPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{orderData.quantity}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-neutral-800">
                  <span>Total Amount:</span>
                  <span>₹{(orderData.productPrice * orderData.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="rounded border p-6 bg-white">
            <h3 className="font-semibold mb-3">Delivery Address</h3>
            <div className="text-sm space-y-1 text-neutral-600">
              <p><strong>{orderData.customerDetails.name}</strong></p>
              <p>{orderData.customerDetails.address}</p>
              {orderData.customerDetails.landmark && <p>{orderData.customerDetails.landmark}</p>}
              <p>{orderData.customerDetails.city} - {orderData.customerDetails.postalCode}</p>
              <p className="mt-2"><strong>Phone:</strong> {orderData.customerDetails.phone}</p>
            </div>
          </div>

          <div className="rounded border p-6 bg-white">
            <h3 className="font-semibold mb-3">Delivery Timeline</h3>
            <div className="text-sm space-y-2 text-neutral-600">
              <div>
                <p className="text-xs text-neutral-500">Order Placed</p>
                <p className="font-semibold text-green-600">{new Date(orderData.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="border-l-2 border-green-300 my-2 pl-2">
                <p className="text-xs text-neutral-500">Estimated Delivery</p>
                <p className="font-semibold text-neutral-800">{estimatedDelivery.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="rounded border p-6 bg-white mb-6">
          <h3 className="font-semibold mb-3">Payment Information</h3>
          <div className="text-sm space-y-2 text-neutral-600">
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="capitalize">{orderData.paymentMethod === 'card' ? 'Credit/Debit Card' : orderData.paymentMethod === 'upi' ? 'UPI' : orderData.paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery'}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-600 font-semibold">Confirmed</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
            <li>You will receive an order confirmation email shortly</li>
            <li>Your order will be packed and dispatched within 24-48 hours</li>
            <li>You can track your order in the "My Orders" section</li>
            <li>If you face any issues, contact our customer support</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link href="/" className="flex-1 text-center bg-black text-white px-4 py-3 rounded font-semibold hover:bg-neutral-900 transition">
            Continue Shopping
          </Link>
          <Link href="/products/men" className="flex-1 text-center border px-4 py-3 rounded font-semibold hover:bg-gray-50 transition">
            Explore More
          </Link>
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

OrderSuccessPage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout seo={{ title: 'Order Confirmed', description: 'Your order has been placed' }}>{page}</PrimaryLayout>;
};

export default OrderSuccessPage;
