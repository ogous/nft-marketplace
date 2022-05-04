/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'lh3.googleusercontent.com', 'storage.googleapis.com'],
  },
  env: {
    API_URL: process.env.API_URL,
  },
}

module.exports = nextConfig
