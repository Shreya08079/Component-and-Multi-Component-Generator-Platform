/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://component-and-multi-component-generator.onrender.com',
      },
    ];
  },
};

module.exports = nextConfig;
