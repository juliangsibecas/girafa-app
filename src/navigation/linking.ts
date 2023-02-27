import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<{}> = {
  prefixes: [
    Linking.createURL('/'),
    'http://girafa.com.ar/app',
    'https://girafa.com.ar/app',
  ],
  config: {
    screens: {
      Home: {
        initialRouteName: 'Map',
        screens: {
          PartyDetail: 'party/:idOrSlug',
          UserProfile: 'user/:idOrNickname',
        },
      },
      Chats: {
        initialRouteName: 'ChatHome',
        screens: {
          ChatDirect: 'chat/:id',
        },
      },
    },
  },
};
