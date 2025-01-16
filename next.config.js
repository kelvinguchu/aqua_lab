/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack configuration for path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": __dirname,
    };
    return config;
  },

  // Server actions configuration for Next.js 15
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "aqua-lab.vercel.app"],
      bodySizeLimit: "2mb",
    },
    typedRoutes: true,
  },

  // Configure image domains for Supabase
  images: {
    domains: ["otbekbrcmbppdictcrkr.supabase.co"],
  },
};

module.exports = nextConfig;
