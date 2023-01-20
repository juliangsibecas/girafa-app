import * as Linking from 'expo-linking';

export const openUrl = async (url: string) => {
  if (await Linking.canOpenURL(url)) {
    await Linking.openURL(url);
  }
};
