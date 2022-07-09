import 'dotenv/config';

export default {
  name: 'Girafa',
  slug: 'girafa',
  entryPoint: 'index.tsx',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'girafa',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'ar.com.girafa.app',
    supportsTablet: true,
  },
  android: {
    package: 'ar.com.girafa.app',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'onesignal-expo-plugin',
      {
        mode: 'development',
      },
    ],
  ],
  extra: {
    onesignalAppId: process.env.ONESIGNAL_APP_ID,
    googleMapsKey: process.env.GOOGLE_MAPS_KEY,
  },
};
