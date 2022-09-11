import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import { FontFamily } from '../../../theme/text/types';
import { useTranslation } from 'react-i18next';

type Props = {
  onChange: (uri: string) => void;
  onBlur: (e: any) => void;
};

export const ImageInput: React.FC<Props> = ({ onChange, onBlur }) => {
  const { t } = useTranslation();
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.cancelled) {
        onBlur({});
        return;
      }

      onChange(result.uri);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button small onPress={pickImage}>
      <Box flex row>
        <Icon name="image" color="background" weight={2.5} />
        <Text ml={1} color="background" fontFamily={FontFamily.BOLD}>
          {t('general.photo')}
        </Text>
      </Box>
    </Button>
  );
};
