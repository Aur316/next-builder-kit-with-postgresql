import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swiperjs.com',
        pathname: '/demos/images/**',
      },
    ],
  },
}

export default nextConfig
