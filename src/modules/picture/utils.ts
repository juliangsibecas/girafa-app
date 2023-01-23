import { env } from '../../env';

export const getUserPictureUrl = (id: string) =>
  `${env.assetsUrl}/user-pictures/${id}.jpeg`;

export const getUploadUserPictureUrl = () =>
  `${env.apiUrl}/images/user-picture`;

export const getPartyPictureUrl = (id: string) =>
  `${env.assetsUrl}/party-pictures/${id}.jpeg`;

export const getUploadPartyPictureUrl = (id: string) =>
  `${env.apiUrl}/images/party-picture/${id}`;
