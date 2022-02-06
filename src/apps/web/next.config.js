const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withTM = require('next-transpile-modules')([
  'repro-app',
  '@gorhom/bottom-sheet',
  '@gorhom/portal',
  'expo-next-react-navigation',
  '@nandorojo/swr-react-native',
  'moti',
  'dripsy',
  '@dripsy/core',
  '@motify/core',
  '@motify/components',
]);

const { withExpo } = require('./next.expo.config');

const API_URL = process.env.API_URL ?? 'http://localhost:3009';

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          // in prod, this value is replaced dynamically by the scripts/apiUrl.js
          source: '/api/:path*',
          destination: `${API_URL}/:path*`, // Proxy to Backend
        },
        {
          source: '/',
          destination: '/words',
        },
      ],
    };
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins(
  [
    withTM,
    withFonts,
    withImages,
    withBundleAnalyzer,
    // eslint-disable-next-line no-path-concat
    [withExpo, { projectRoot: __dirname + '/../../..' }],
  ],
  nextConfig
);
