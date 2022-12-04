import * as FileSystem from 'expo-file-system';
import { FileSystemUploadType } from 'expo-file-system';
import { useAuth } from '../auth/hooks';
import { getUploadPartyPictureUrl, getUploadUserPictureUrl } from './utils';

export const usePictureUpload = () => {
  const { accessToken } = useAuth();

  const upload = async (endpoint: string, uri: string) =>
    FileSystem.uploadAsync(endpoint, uri, {
      httpMethod: 'POST',
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: 'file',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  const uploadUser = (uri: string) => upload(getUploadUserPictureUrl(), uri);

  const uploadParty = (id: string, uri: string) =>
    upload(getUploadPartyPictureUrl(id), uri);

  return { uploadUser, uploadParty };
};
