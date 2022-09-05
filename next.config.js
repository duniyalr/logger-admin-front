/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    nestSessionKey: "x-access-token",
    nestApiHost: "http://localhost:3001"
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
