import { env } from '../../env';

export const getPartyPictureUrl = (id: string) =>
  `${env.s3Url}/party-pictures/${id}.jpeg`;

export const getUploadPartyPictureUrl = (id: string) =>
  `${env.apiUrl}/images/party-picture/${id}`;
