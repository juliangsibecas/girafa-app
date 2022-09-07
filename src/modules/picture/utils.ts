import { env } from '../../env';

export const getUserPictureUrl = (id: string) =>
  `${env.s3Url}/user-pictures/${id}.jpeg`;

export const getUploadUserPictureUrl = () =>
  `${env.apiUrl}/images/user-picture`;

export const getPartyPictureUrl = (id: string) =>
  `${env.s3Url}/party-pictures/${id}.jpeg`;

export const getUploadPartyPictureUrl = (id: string) =>
  `${env.apiUrl}/images/party-picture/${id}`;
