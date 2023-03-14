import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';

import { Box, Image, Text } from '../../../components';

import { UserAvatar } from './UserAvatar';
import { Maybe } from '../../../types';
import { UserBanner } from './UserBanner';
import { useTranslation } from 'react-i18next';

interface Props {
  id: string;
  bannerId?: Maybe<string>;
}

export const UserBannerPicker: React.FC<Props> = ({ id, bannerId }) => {
  const { t } = useTranslation();
  const { handleChange, values } = useFormikContext<Record<string, string>>();

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
          allowsMultipleSelection: false,
          selectionLimit: 1,
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
    <Box center>
      <TouchableOpacity onPress={pickImage}>
        {values[id] ? (
          <Image
            src={values[id]}
            height={15}
            borderRadius={2}
            aspectRatio={9 / 16}
          />
        ) : (
          <UserBanner id={bannerId} height={15} placeholderSize={4} />
        )}
      </TouchableOpacity>
      <Text mt={1}>{t('user.screens.Edit.banner')}</Text>
    </Box>
  );
};
