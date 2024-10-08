import dotenv from 'dotenv';

const env = process.env.NODE_ENV ?? 'production';
dotenv.config({ path: `.env.${env}` });

export default {
  name: 'Girafa',
  slug: 'girafa',
  entryPoint: 'index.js',
  version: '0.0.1',
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  scheme: 'girafa',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#774DF0',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'ar.com.girafa.app',
    supportsTablet: true,
    associatedDomains: ['applinks:girafa.com.ar'],
  },
  android: {
    package: 'ar.com.girafa.app',
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundImage: './src/assets/images/adaptive-icon-bg.png',
    },
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'onesignal-expo-plugin',
      {
        mode: env.toLowerCase(),
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '03090a85-32cc-4c83-8eac-15c58efdda4b',
    },
    apiUrl: process.env.API_URL,
    assetsUrl: process.env.ASSETS_URL,
    oneSignalId: process.env.ONESIGNAL_APP_ID,
  },
};
