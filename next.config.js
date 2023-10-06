/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    serverActions: true,
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};
