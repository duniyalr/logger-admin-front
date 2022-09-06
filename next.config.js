/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    nestSessionKey: "x-access-token",
    nestApiHost: "http://localhost:3001"
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*"
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
