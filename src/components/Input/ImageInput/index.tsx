import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { FontFamily } from '../../../theme/text/types';

type Props = {
  value?: string;
  onChange: (uri: string) => void;
  onBlur: (e: any) => void;
};

export const ImageInput: React.FC<Props> = ({ value, onChange, onBlur }) => {
  const { t } = useTranslation();
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
          onBlur({});
          return;
        }

        onChange(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const textColor = value ? 'background' : 'primary';

  return (
    <Button small secondary={!value} onPress={pickImage}>
      <Box row>
        <Icon name="image" color={textColor} weight={2.5} />
        <Text ml={1} color={textColor} fontFamily={FontFamily.BOLD}>
          {t('general.photo')}
        </Text>
      </Box>
    </Button>
  );
};
