const nextConfig = {
  output: 'export',  // Necessário para GitHub Pages
  images: {
    unoptimized: true,  // Necessário quando usar export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  }
}

module.exports = nextConfig