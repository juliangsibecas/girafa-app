import * as FileSystem from 'expo-file-system';
import { FileSystemUploadType } from 'expo-file-system';
import { useAuth } from '../auth/hooks';
import { getUploadPartyPictureUrl } from './utils';

export const usePictureUpload = () => {
  const { accessToken } = useAuth();

  const upload = async (id: string, uri: string) =>
    await FileSystem.uploadAsync(getUploadPartyPictureUrl(id), uri, {
      httpMethod: 'POST',
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: 'file',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return { upload };
};
