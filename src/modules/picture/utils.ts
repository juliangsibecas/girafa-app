import { env } from '../../env';

export const getUserPictureUrl = (id: string) =>
  `${env.assetsUrl}/user-pictures/${id}.jpeg`;

export const getUserBannerUrl = (id: string) =>
  `${env.assetsUrl}/user-banners/${id}.jpeg`;

export const getUploadUserPictureUrl = () =>
  `${env.apiUrl}/images/user-picture`;

export const getUploadUserBannerUrl = () => `${env.apiUrl}/images/user-banner`;

export const getPartyPictureUrl = (id: string) =>
  `${env.assetsUrl}/party-pictures/${id}.jpeg`;

export const getUploadPartyPictureUrl = (id: string) =>
  `${env.apiUrl}/images/party-picture/${id}`;
