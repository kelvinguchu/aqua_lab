/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack configuration for path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": ".",
    };
    return config;
  },

  // Server actions configuration for Next.js 15
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },

  // Configure image domains for Supabase
  images: {
    domains: ["otbekbrcmbppdictcrkr.supabase.co"],
  },
};

module.exports = nextConfig;
