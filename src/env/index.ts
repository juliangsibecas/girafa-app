import Constants from 'expo-constants';

type Env = {
  apiUrl: string;
  s3Url: string;
  oneSignalId: string;
};

export const env = Constants.manifest!.extra! as Env;
