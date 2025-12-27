import { useState } from 'react';

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function AddToCartButton({ id, name, price, image }: AddToCartButtonProps) {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    setAdding(true);
    const cart: { id: string; title: string; price: number; image: string; quantity: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, title: name, price, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={adding}
      className="border px-4 py-2 rounded text-sm font-semibold"
    >
      {adding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
