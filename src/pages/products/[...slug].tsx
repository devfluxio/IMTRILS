import type { GetStaticPathsResult, GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Navigation, ProductsList, Search } from '@/components';
import { useEffect, useState, useContext } from 'react';
import { SearchContext } from '@/layouts/PrimaryLayout';
import { Pagination } from '@/components/ui';
import { PrimaryLayout } from '@/layouts';

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string)),
    },
  };
};

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

const Products: NextPageWithLayout = () => {
  const router = useRouter();
  const pageSize = 12;
  const page = Number(router.query.page) || 1;
  const slug = router.query.slug as string[] | undefined;
  const category = slug && slug.length > 0 ? slug[0] : undefined;

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        const isGender = category && ['men', 'women', 'unisex', 'kids'].includes(category?.toLowerCase?.());
        if (isGender) {
          params.append('gender', category.toLowerCase());
        } else if (category) {
          params.append('category', category);
        }
        params.append('page', String(page));
        params.append('pageSize', String(pageSize));

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'}/api/products?${params.toString()}`);
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
        setTotalCount(data.totalCount || 0);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setFilteredProducts([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, page]);

  // Filter products by global search value
  useEffect(() => {
    if (!searchValue) {
      setFilteredProducts(products);
      return;
    }
    const lower = searchValue.toLowerCase();
    setFilteredProducts(
      products.filter((p: any) =>
        (p.name || p.title || '').toLowerCase().includes(lower) ||
        (p.description || '').toLowerCase().includes(lower) ||
        (p.brand || '').toLowerCase().includes(lower)
      )
    );
  }, [searchValue, products]);

  return (
    <div className="mx-auto items-center p-4 xl:container">
      <div className="w-full">
        <div className="flex items-center mb-3">
          <span className="text-sm text-neutral-600">Found {filteredProducts.length} products</span>
        </div>
        <ProductsList products={filteredProducts} isLoading={loading} />
        <div className="flex justify-center py-5">
          <Pagination
            totalCount={totalCount}
            currentPage={page}
            pageSize={pageSize}
            onPageChange={newPage =>
              router.push({ query: { ...router.query, page: newPage } }, undefined, {
                shallow: true,
                scroll: true,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout
      seo={{
        title: 'Products',
        description: 'Products',
        canonical: 'https://imtrils.vercel.app/products',
      }}
    >
      {page}
    </PrimaryLayout>
  );
};

export default Products;
