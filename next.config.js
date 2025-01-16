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

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "aqua-lab.vercel.app"],
      bodySizeLimit: "2mb",
    },
    typedRoutes: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
