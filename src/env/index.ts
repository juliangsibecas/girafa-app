import Constants from 'expo-constants';

type Env = {
  apiUrl: string;
  assetsUrl: string;
  oneSignalId: string;
};

export const env = Constants.manifest!.extra! as Env;
