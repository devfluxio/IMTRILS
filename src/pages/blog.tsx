import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { PrimaryLayout } from '@/layouts';
import { FiCalendar, FiUser, FiArrowRight, FiTrendingUp, FiBookmark } from 'react-icons/fi';

// Mock Data for Blog Posts
const blogPosts = [
  { id: 1, title: 'The Ultimate Guide to Finding Your Perfect Fit', excerpt: 'Discover the secrets to measuring yourself correctly and choosing the right size for all-day comfort.', category: 'Guide', date: 'Oct 12, 2023', author: 'Sarah J.', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: '5 Fabric Trends Taking Over This Season', excerpt: 'From sustainable bamboo to high-tech breathable mesh, explore the materials redefining innerwear.', category: 'Trends', date: 'Oct 08, 2023', author: 'Mike T.', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Why Sustainable Lingerie Matters', excerpt: 'How eco-friendly choices in your intimate wardrobe can make a massive impact on the planet.', category: 'Sustainability', date: 'Sep 25, 2023', author: 'Emma W.', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Care Instructions: Make Your Garments Last', excerpt: 'Simple washing and storage tips to keep your favorites looking new for years.', category: 'Tips', date: 'Sep 15, 2023', author: 'Team ShopSphere', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=800&auto=format&fit=crop' },
];

const BlogPage: NextPageWithLayout = () => {
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero / Featured Section */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-violet-600 font-bold tracking-wider uppercase text-xs mb-2 block">The Inner Circle</span>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Stories & Style</h1>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Expert advice, style inspiration, and the latest news from the world of comfort and fashion.
            </p>
          </div>

          {/* Featured Post Card */}
          <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
            
            <div className="relative z-20 p-8 md:p-16 max-w-3xl">
              <div className="flex items-center gap-2 text-violet-300 mb-4 text-sm font-medium">
                <FiTrendingUp /> <span>Trending Now</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Redefining Comfort: The New Collection is Here
              </h2>
              <p className="text-neutral-300 text-lg mb-8 max-w-xl">
                Explore the design philosophy behind our latest release, focusing on seamless technology and adaptive fabrics.
              </p>
              <button className="bg-white text-neutral-900 px-8 py-3 rounded-full font-bold hover:bg-violet-50 transition-colors flex items-center gap-2">
                Read Article <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <h3 className="text-2xl font-bold text-neutral-900">Latest Articles</h3>
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'Guides', 'Trends', 'Sustainability', 'Lifestyle'].map((cat, idx) => (
              <button key={idx} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300 flex flex-col h-full">
              {/* Image Placeholder */}
              <div className="h-64 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-neutral-900 uppercase tracking-wide">
                  {post.category}
                </div>
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                  <span className="flex items-center gap-1"><FiCalendar /> {post.date}</span>
                  <span className="flex items-center gap-1"><FiUser /> {post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-violet-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-neutral-500 mb-6 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                  <button className="text-sm font-bold text-neutral-900 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More <FiArrowRight />
                  </button>
                  <button className="text-neutral-400 hover:text-violet-600 transition-colors">
                    <FiBookmark size={20} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination / Load More */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 border border-neutral-300 rounded-full text-neutral-600 font-medium hover:border-neutral-900 hover:text-neutral-900 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout seo={{ title: 'Blog - Style & Stories', description: 'Read our latest fashion tips and news.' }}>{page}</PrimaryLayout>;
};

export default BlogPage;