import * as Linking from 'expo-linking';

import { Box, Button, Image, Text } from '../../../components';
import illustration from '../../../assets/images/build.png';

import { getStoreUrl } from '../utils';
import { useTranslation } from 'react-i18next';

export const ForceUpdateScreen = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'maintenance.screens.ForceUpdate',
  });
  const handlePress = () => {
    const url = getStoreUrl();
    Linking.canOpenURL(url).then(() => Linking.openURL(url));
  };

  return (
    <Box center px={4} style={{ flex: 1 }}>
      <Image src={illustration} height={30} style={{ resizeMode: 'contain' }} />
      <Text type="h3" textCenter>
        {t('title')}
      </Text>
      <Text mt={1} textCenter>
        {t('text')}
      </Text>
      <Button small mt={4} px={2} onPress={handlePress}>
        {t('update')}
      </Button>
    </Box>
  );
};
