import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { PrimaryLayout } from '@/layouts';
import { FiTag, FiClock, FiFilter, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

// Mock Data for Sale Items
const saleItems = [
  { id: 1, title: 'Seamless Comfort Bra', price: 29.99, originalPrice: 49.99, discount: '40%', category: 'Bras', imageColor: 'bg-pink-100' },
  { id: 2, title: 'Cotton Lounge Set', price: 45.00, originalPrice: 75.00, discount: '40%', category: 'Lounge', imageColor: 'bg-blue-100' },
  { id: 3, title: 'Silk Touch Panties (3-Pack)', price: 19.99, originalPrice: 35.00, discount: '45%', category: 'Panties', imageColor: 'bg-purple-100' },
  { id: 4, title: 'Active Support Sports Bra', price: 34.50, originalPrice: 60.00, discount: '42%', category: 'Active', imageColor: 'bg-green-100' },
  { id: 5, title: 'Lace Trim Nightgown', price: 55.00, originalPrice: 89.00, discount: '38%', category: 'Sleep', imageColor: 'bg-red-50' },
  { id: 6, title: 'Everyday Cotton Briefs', price: 12.99, originalPrice: 25.00, discount: '50%', category: 'Panties', imageColor: 'bg-yellow-50' },
];

const SalePage: NextPageWithLayout = () => {
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-r from-black via-neutral-900 to-black text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-violet-200">
                <FiClock /> Limited Time Offer
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                End of Season <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">Flash Sale</span>
              </h1>
              <p className="text-lg text-violet-100 max-w-lg">
                Upgrade your wardrobe with premium innerwear at unbeatable prices. Up to 50% off on selected styles.
              </p>
              <button className="bg-white text-violet-900 px-8 py-3 rounded-full font-bold hover:bg-violet-50 transition-colors shadow-lg shadow-violet-900/20">
                Shop All Deals
              </button>
            </div>
            
            {/* Decorative Sale Badge */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-pink-500 blur-3xl opacity-20 rounded-full"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <span className="block text-sm uppercase tracking-widest mb-2">Up To</span>
                <span className="block text-7xl font-black text-white">50%</span>
                <span className="block text-2xl font-bold text-pink-300">OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-600 font-medium">
            <FiFilter /> <span className="hidden sm:inline">Filter Items</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {['All', 'Bras', 'Panties', 'Sleepwear', 'Activewear'].map((cat, idx) => (
              <button key={idx} className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${idx === 0 ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {saleItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300 flex flex-col">
              {/* Image Area */}
              <div className={`relative h-64 ${item.imageColor} flex items-center justify-center overflow-hidden`}>
                <span className="text-neutral-400 font-medium text-lg opacity-50 group-hover:scale-110 transition-transform duration-500">Product Image</span>
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <FiTag size={12} /> {item.discount} OFF
                </div>

                {/* Hover Action */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-white text-neutral-900 font-semibold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-neutral-50">
                    <FiShoppingBag /> Add to Cart
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-neutral-500 mb-1 uppercase tracking-wide">{item.category}</div>
                <h3 className="font-semibold text-neutral-900 text-lg mb-2 group-hover:text-violet-600 transition-colors">{item.title}</h3>
                <div className="mt-auto flex items-center gap-3">
                  <span className="text-xl font-bold text-red-600">${item.price}</span>
                  <span className="text-sm text-neutral-400 line-through">${item.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-neutral-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Don't Miss the Next Drop</h2>
            <p className="text-neutral-400 mb-8">Subscribe to our newsletter to get early access to flash sales and exclusive discounts.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-500 transition-colors flex items-center justify-center gap-2">
                Subscribe <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SalePage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout seo={{ title: 'Sale - Up to 50% Off', description: 'Shop our end of season sale.' }}>{page}</PrimaryLayout>;
};

export default SalePage;