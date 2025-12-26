import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PrimaryLayout } from '@/layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { ReactElement } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProduct(data);
        const first = (data.images && data.images.length > 0) ? data.images[0] : '/assets/placeholder.png';
        setSelectedImage(first);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuy = () => {
    router.push(`/order/${product._id}`);
  };

  if (!product) return <div className="p-8">{loading ? 'Loading...' : 'Product not found'}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded bg-white p-4">
            <div className="h-[500px] w-full relative">
              <Image src={selectedImage || '/assets/placeholder.png'} alt={product.title} fill className="object-contain" />
            </div>
            <div className="flex gap-3 mt-3">
              {(product.images || []).map((img: string, idx: number) => (
                <button key={idx} onClick={() => setSelectedImage(img)} className="h-20 w-20 overflow-hidden rounded">
                  <Image src={img} alt={`${product.title} ${idx}`} width={80} height={80} className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded bg-white p-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-neutral-600 mt-2">{product.description}</p>
          <div className="mt-4">
            <div className="text-2xl font-bold">₹{product.price}</div>
            <div className="mt-2">Brand: {product.brand || '—'}</div>
          </div>

          {/* Size cube input */}
          {Array.isArray(product.sizes) && product.sizes.length > 0 && (
            <div className="mt-4">
              <label className="block text-xs font-medium mb-1">Size:</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 flex items-center justify-center border text-xs font-semibold transition-all duration-150
                      ${selectedSize === size ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-black border-gray-300'}
                      rounded-none`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color cube input */}
          {Array.isArray(product.colors) && product.colors.length > 0 && (
            <div className="mt-4">
              <label className="block text-xs font-medium mb-1">Color:</label>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 flex items-center justify-center border text-[10px] font-semibold transition-all duration-150
                      ${selectedColor === color ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-black border-gray-300'}
                      rounded-none p-[0.5px]`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button onClick={handleBuy} className="bg-black text-white px-4 py-2 rounded">Buy Now</button>
            <button onClick={() => alert('Add to cart not implemented')} className="border px-4 py-2 rounded">Add to cart</button>
          </div>

          <div className="mt-6 text-sm text-neutral-500">
            <div>SKU: {product.sku || '—'}</div>
            <div>Stock: {product.stock ?? '—'}</div>
            <div>Categories: {(product.categories || []).join(', ')}</div>
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

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout seo={{ title: 'Product', description: 'Product detail' }}>{page}</PrimaryLayout>;
};

export default ProductDetail;
