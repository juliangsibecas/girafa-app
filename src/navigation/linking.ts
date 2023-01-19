import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<any> = {
  prefixes: [
    Linking.createURL('/'),
    'http://girafa.com.ar/app',
    'https://girafa.com.ar/app',
  ],
  config: {
    screens: {
      Home: {
        screens: {
          PartyDetail: 'party/:idOrSlug',
          UserProfile: 'user/:idOrNickname',
        },
      },
    },
  },
};
