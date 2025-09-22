/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/assets/**',
      },
    ],
  },
  env: {
    GRAPHQL_ENDPOINT: 'http://127.0.0.1:3000/graphql',
  },
  // Enable source maps in development for better debugging
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
