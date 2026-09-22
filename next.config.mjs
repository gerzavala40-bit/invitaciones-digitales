/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  allowedDevOrigins: ['192.168.100.19'],
};

export default nextConfig;

