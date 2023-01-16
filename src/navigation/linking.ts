import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<any> = {
  prefixes: [Linking.createURL('/'), 'https://girafa.com.ar'],
  config: {
    screens: {
      Home: {
        screens: {
          PartyDetail: 'party/:id',
          UserProfile: 'user/:id',
        },
      },
    },
  },
};
