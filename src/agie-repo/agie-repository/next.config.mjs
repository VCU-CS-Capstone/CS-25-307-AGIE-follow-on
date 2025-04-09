/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed 'output: export' to enable API routes and middleware
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
