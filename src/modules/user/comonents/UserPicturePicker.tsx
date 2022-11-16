import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';

import { Avatar, Box, Image } from '../../../components';

import { useAuth } from '../../auth';
import { getUserPictureUrl } from '../../picture';

interface Props {
  id: string;
}

export const UserPicturePicker: React.FC<Props> = ({ id }) => {
  const { userId } = useAuth();
  const { handleChange, values } = useFormikContext<Record<string, string>>();

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [9, 16],
          quality: 1,
        });

        if (result.cancelled) {
          return;
        }

        handleChange(id)(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box flex center>
      <TouchableOpacity onPress={pickImage}>
        {values[id] ? (
          <Image
            src={values[id]}
            width={15}
            height={15}
            style={{ borderRadius: 100 }}
          />
        ) : (
          <Avatar
            type="user"
            src={getUserPictureUrl(userId)}
            width={15}
            height={15}
            placeholderSize={8}
            style={{ borderRadius: 100 }}
          />
        )}
      </TouchableOpacity>
    </Box>
  );
};
