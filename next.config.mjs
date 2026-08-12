/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/french-immersion-tutor',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
