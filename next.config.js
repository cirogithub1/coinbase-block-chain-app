/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: ''
      },

      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
