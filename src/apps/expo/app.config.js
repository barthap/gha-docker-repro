const config = {
  scheme: `${'com.barthap.reproapp'}.development`,
  icon: './assets/icon.development.png',
  backgroundColor: '#FF0000',
};

export default {
  name: 'repro',
  description: 'Repro App - your own custom dictionary',
  slug: 'repro',
  scheme: 'repro',
  owner: 'barthap10',
  icon: config.icon,
  version: '0.0.1',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  ios: {
    bundleIdentifier: config.scheme,
    supportsTablet: true,
    jsEngine: 'hermes',
  },
  android: {
    package: config.scheme,
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: config.backgroundColor,
    },
    jsEngine: 'hermes',
  },
  androidNavigationBar: {
    barStyle: 'dark-content',
    backgroundColor: '#FFFFFF',
  },
  assetBundlePatterns: ['**/*'],
  orientation: 'portrait',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  userInterfaceStyle: 'automatic',
  extra: {
    STAGE: process.env.STAGE,
    API_URL: process.env.API_URL || 'http://localhost:3001',
  },
};
