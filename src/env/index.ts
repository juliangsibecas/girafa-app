import Constants from 'expo-constants';
import { devApiUrl, devAssetsUrl } from '../utils/env';

type Env = {
  apiUrl: string;
  assetsUrl: string;
  oneSignalId: string;
};

export const env = {
  ...Constants.manifest!.extra!,
  apiUrl:
    process.env.NODE_ENV === 'development'
      ? devApiUrl
      : Constants.manifest!.extra!.apiUrl,
  assetsUrl:
    process.env.NODE_ENV === 'development'
      ? devAssetsUrl
      : Constants.manifest!.extra!.assetsUrrl,
} as Env;
