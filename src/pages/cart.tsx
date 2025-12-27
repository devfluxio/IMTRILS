import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load cart from localStorage
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
    setLoading(false);
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const removeItem = (id: string) => {
    updateCart(cart.filter(item => item.id !== id));
  };

  const changeQty = (id: string, qty: number) => {
    updateCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };


  // Order Now: Go to product page, remove from cart after order
  const orderNow = (item: CartItem) => {
    // Remove item from cart
    const newCart = cart.filter(p => p.id !== item.id);
    updateCart(newCart);
    // Redirect to product page
    router.push(`/product/${item.id}`);
  };

  if (loading) return <div className="p-8 text-center">Loading cart...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-neutral-500">Your cart is empty.</div>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map(item => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded border" />
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-neutral-500">₹{item.price}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span>Qty:</span>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => changeQty(item.id, Number(e.target.value))}
                      className="w-14 border rounded px-2 py-1"
                    />
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 font-bold px-2">Remove</button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <div className="text-lg font-semibold">
              Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </div>
            <button
              onClick={() => orderNow(cart[0])}
              disabled={cart.length === 0}
              className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-900 font-bold"
            >
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
