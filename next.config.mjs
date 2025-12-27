/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
    unoptimized: true, // SSR ke liye safe
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: 'standalone', // SSR ke liye
};

export default nextConfig;
