import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';

import defaultPicture from '../../../../assets/images/user.png';

import { Box, Image } from '../../../components';

import { useAuth } from '../../auth';
import { getUserPictureUrl } from '../../picture';

interface Props {
  id: string;
}

export const UserPicturePicker: React.FC<Props> = ({ id }) => {
  const { userId } = useAuth();
  const { handleBlur, handleChange, values } =
    useFormikContext<Record<string, string>>();

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [9, 16],
          quality: 1,
        });

        if (result.cancelled) {
          // handleBlur(id)({});
          return;
        }

        handleChange(id)(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(values[id] ?? getUserPictureUrl(userId));

  return (
    <Box flex center>
      <TouchableOpacity onPress={pickImage}>
        <Image
          src={values[id] ?? getUserPictureUrl(userId)}
          fallbackSrc={defaultPicture}
          width={15}
          height={15}
          style={{ borderRadius: 100 }}
        />
      </TouchableOpacity>
    </Box>
  );
};
