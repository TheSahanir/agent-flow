/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/agent-flow' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/agent-flow/' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
