/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": __dirname,
    };
    return config;
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "aqua-lab.vercel.app"],
    },
  },
};

module.exports = nextConfig;