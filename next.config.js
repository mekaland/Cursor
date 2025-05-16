/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Development modunda performans optimizasyonları
  webpack: (config, { dev, isServer }) => {
    // Development modunda hot reload'u optimize et
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Polling aralığını artır
        aggregateTimeout: 300, // Değişiklikleri toplu işle
      }
    }
    return config
  },
  // Development modunda bazı özellikleri devre dışı bırak
  experimental: {
    // Development modunda optimize et
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'react-icons'],
  },
}

module.exports = nextConfig 