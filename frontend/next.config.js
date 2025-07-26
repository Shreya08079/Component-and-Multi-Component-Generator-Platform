/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with Netlify routing
  output: 'export', // Enable static export for Netlify
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://component-and-multi-component-generator.onrender.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
