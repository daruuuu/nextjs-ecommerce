/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
