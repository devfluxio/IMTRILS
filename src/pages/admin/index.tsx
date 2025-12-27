import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import { PrimaryLayout } from '@/layouts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

type Product = any;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});

const AdminPage: NextPageWithLayout = () => {
    const router = useRouter();
  // Use localStorage for token, check admin access
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<any>({
    title: '',
    description: '',
    price: '',
    compareAtPrice: '',
    sku: '',
    stock: 0,

    images: [],
    categories: '',
    tags: '',

    gender: 'men',
    productType: '',

    sizes: '',
    colors: '',

    fabric: '',
    material: '',
    care: '',
    fit: '',
    pattern: '',

    supportLevel: '',
    padding: '',
    wireType: '',

    brand: '',

    seoTitle: '',
    seoDesc: '',

    variantsJson: '',

    published: true,
    featured: false,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  });

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      price: '',
      compareAtPrice: '',
      sku: '',
      stock: 0,
      images: [],
      categories: '',
      tags: '',
      gender: 'men',
      productType: '',
      sizes: '',
      colors: '',
      fabric: '',
      material: '',
      care: '',
      fit: '',
      pattern: '',
      supportLevel: '',
      padding: '',
      wireType: '',
      brand: '',
      seoTitle: '',
      seoDesc: '',
      variantsJson: '',
      published: true,
      featured: false,
    });
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/products`, {
        headers: headers(),
      });
      if (!res.ok) throw new Error('Fetch failed');
      setProducts(await res.json());
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // On mount and on route change, check token and verify admin
    const verifyAdmin = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        setIsAdmin(false);
        router.replace('/');
        return;
      }
      setToken(storedToken);
      // Call backend to verify admin
      try {
        const res = await fetch(`${API_BASE}/api/auth/verify-admin`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        if (res.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          router.replace('/');
        }
      } catch {
        setIsAdmin(false);
        router.replace('/');
      }
    };
    verifyAdmin();
  }, [router.asPath]);

  useEffect(() => {
    if (isAdmin && token) {
      fetchProducts();
    }
  }, [isAdmin, token]);

  const submit = async (e?: any) => {
    e?.preventDefault();

    try {
      const payload: any = {
        title: form.title,
        description: form.description,
        price: Number(form.price) || 0,
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
        sku: form.sku,
        stock: Number(form.stock) || 0,

        images: form.images,
        categories: form.categories.split(',').map((s: string) => s.trim()),
        tags: form.tags.split(',').map((s: string) => s.trim()),

        gender: form.gender,
        productType: form.productType,

        sizes: form.sizes.split(',').map((s: string) => s.trim()),
        colors: form.colors.split(',').map((s: string) => s.trim()),

        fabric: form.fabric,
        material: form.material,
        care: form.care,
        fit: form.fit,
        pattern: form.pattern,

        supportLevel: form.supportLevel,
        padding: form.padding,
        wireType: form.wireType,

        brand: form.brand,

        seo: {
          title: form.seoTitle,
          description: form.seoDesc,
        },

        published: form.published,
        featured: form.featured,
      };

      if (form.variantsJson) {
        const v = JSON.parse(form.variantsJson);
        if (Array.isArray(v)) payload.variants = v;
      }

      const url = editingId
        ? `${API_BASE}/api/admin/products/${editingId}`
        : `${API_BASE}/api/admin/products`;

      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: headers(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Save failed');

      await fetchProducts();
      resetForm();
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const uploadFiles = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    try {
      const fd = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) fd.append('images', selectedFiles[i]);

      // GET gender from form (men/women/unisex/kids)
      const gender = form.gender || 'unisex';
      const uploadUrl = `${API_BASE}/api/admin/uploads?gender=${gender}`;

      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: fd,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      const urls = data.files || [];
      // append uploaded urls to images field
      const merged = [...(Array.isArray(form.images) ? form.images : []), ...urls];
      setForm({ ...form, images: merged });
      setSelectedFiles(null);
      alert('Upload successful');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete product?')) return;
    await fetch(`${API_BASE}/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });
    fetchProducts();
  };

  const startEdit = (p: Product) => {
    setEditingId(p._id);
    setForm({
      ...form,
      title: p.title || '',
      description: p.description || '',
      price: String(p.price || ''),
      sku: p.sku || '',
      stock: p.stock || 0,
      images: p.images || [],
      categories: (p.categories || []).join(', '),
      tags: (p.tags || []).join(', '),
      sizes: (p.sizes || []).join(', '),
      colors: (p.colors || []).join(', '),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Admin – Inner Garments Products</h1>
      {/* Only show admin page if isAdmin is true */}
      {loading ? (
        <div className="text-center text-lg py-10">Loading products...</div>
      ) : isAdmin ? (
        <>
          <form onSubmit={submit} className="border p-4 rounded mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
            <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <input placeholder="Compare Price" value={form.compareAtPrice} onChange={e => setForm({ ...form, compareAtPrice: e.target.value })} />
            <input placeholder="SKU" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} />
            <input placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />

            <input placeholder="Categories (comma separated)" value={form.categories} onChange={e => setForm({ ...form, categories: e.target.value })} />
            <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />

            <input placeholder="Sizes (S,M,L)" value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} />
            <input placeholder="Colors" value={form.colors} onChange={e => setForm({ ...form, colors: e.target.value })} />

            <input placeholder="Product Type" value={form.productType} onChange={e => setForm({ ...form, productType: e.target.value })} />
            <input placeholder="Gender (men,women,unisex)" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} />

            <input placeholder="Fabric" value={form.fabric} onChange={e => setForm({ ...form, fabric: e.target.value })} />
            <input placeholder="Material" value={form.material} onChange={e => setForm({ ...form, material: e.target.value })} />

            <input placeholder="Fit" value={form.fit} onChange={e => setForm({ ...form, fit: e.target.value })} />
            <input placeholder="Pattern" value={form.pattern} onChange={e => setForm({ ...form, pattern: e.target.value })} />

            <input placeholder="Support Level (low,medium,high)" value={form.supportLevel} onChange={e => setForm({ ...form, supportLevel: e.target.value })} />
            <input placeholder="Padding (None,Light,Medium)" value={form.padding} onChange={e => setForm({ ...form, padding: e.target.value })} />

            <input placeholder="Wire Type (None,Underwire)" value={form.wireType} onChange={e => setForm({ ...form, wireType: e.target.value })} />
            <input placeholder="Pattern" value={form.pattern} onChange={e => setForm({ ...form, pattern: e.target.value })} />

            {/* Removed manual images textarea. Images are managed via upload only. */}
            <div className="col-span-2 flex items-center gap-3">
              <input type="file" multiple onChange={e => setSelectedFiles(e.target.files ? Array.from(e.target.files) : null)} />
              <button
                type="button"
                onClick={uploadFiles}
                className="text-white px-3 py-1 rounded"
                style={{ background: 'linear-gradient(90deg, #2d033b 70%, #810ca8 100%)' }}
              >
                Upload Selected
              </button>
              <span className="text-sm text-neutral-500">Uploaded URLs will be appended to Images field</span>
            </div>
            <textarea className="col-span-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

            <input placeholder="SEO Title" value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} className="col-span-2" />
            <input placeholder="SEO Description" value={form.seoDesc} onChange={e => setForm({ ...form, seoDesc: e.target.value })} className="col-span-2" />

            <input placeholder="Variants JSON (optional)" value={form.variantsJson} onChange={e => setForm({ ...form, variantsJson: e.target.value })} className="col-span-2" />

            <div className="col-span-2 flex gap-3 items-center">
              <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.published} onChange={e => setForm({ ...form, published: e.target.checked })} /> Published</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
            </div>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded col-span-2">
              {editingId ? 'Update Product' : 'Create Product'}
            </button>
          </form>

          <ul className="space-y-3">
            {products.map(p => (
              <li key={p._id} className="border p-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {p.images && p.images.length > 0 && (
                    <img src={p.images[0]} alt={p.title} className="w-16 h-16 object-cover rounded border" />
                  )}
                  <div>
                    <b>{p.title}</b> – ₹{p.price}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="px-2 rounded text-white"
                    style={{
                      background: 'linear-gradient(90deg, #2d033b 70%, #810ca8 100%)',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(p._id)}
                    className="px-2 rounded text-white"
                    style={{
                      background: 'linear-gradient(90deg, #222 70%, #810ca8 100%)',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="text-center text-red-600 font-semibold text-lg py-10">Access Denied: Admin token required</div>
      )}
    </div>
  );
};

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout seo={{ title: 'Admin', description: 'Admin Panel' }}>{page}</PrimaryLayout>;
};

export default AdminPage;
