/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
  },
  env: {
    API_URL: 'https://nft-backend-fsl3dqjtcq-ey.a.run.app',
  },
}

module.exports = nextConfig
