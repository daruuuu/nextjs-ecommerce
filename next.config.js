/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://nextjs-ecommerce-six-psi.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
