import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';

import { Box, Image } from '../../../components';

import { useAuth } from '../../auth';
import { USER_FALLBACK_SRC } from '../../picture/constants';
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
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (result.cancelled) {
        handleBlur(id)({});
        return;
      }

      handleChange(id)(result.uri);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box flex center>
      <TouchableOpacity onPress={pickImage}>
        <Image
          src={values[id] ?? getUserPictureUrl(userId)}
          fallbackSrc={USER_FALLBACK_SRC}
          width={15}
          height={15}
          style={{ borderRadius: 100 }}
        />
      </TouchableOpacity>
    </Box>
  );
};
