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
    associatedDomains: ['applinks:girafa.com.ar'],
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
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to let you share them with your friends.',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '03090a85-32cc-4c83-8eac-15c58efdda4b',
    },
    apiUrl: process.env.API_URL,
    s3Url: process.env.S3_URL,
    oneSignalId: process.env.ONESIGNAL_APP_ID,
  },
};
