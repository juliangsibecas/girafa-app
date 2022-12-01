import React from 'react';
import { nativeApplicationVersion } from 'expo-application';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';

import { Box, Button, Container, Icon, Text } from '../../../components';
import { FontFamily } from '../../../theme';

import { useAuth } from '../../auth';
import { MyProfileStackParamList, MyProfileStackScreenProps } from '../../user';
import { useTranslation } from 'react-i18next';
import { useFeatureToggle } from '../../featureToggle';
import { FeatureToggleName } from '../../../api';

interface IOption {
  isEnabled: boolean;
  label: string;
  to: keyof MyProfileStackParamList;
  handleAction?: (action: () => void) => void;
}

export const SettingsMenuScreen = () => {
  const { t } = useTranslation();
  const { isEnabled: isSupportEnabled, handleAction: handleSupportAction } =
    useFeatureToggle(FeatureToggleName.Mailing);
  const { navigate } =
    useNavigation<MyProfileStackScreenProps<'Settings'>['navigation']>();
  const { signOut } = useAuth();

  const options: Array<IOption> = [
    {
      isEnabled: true,
      label: t('settings.screens.SettingMenu.changePassword'),
      to: 'PasswordChange',
    },
    {
      isEnabled: isSupportEnabled,
      label: t('settings.screens.SettingMenu.contactSupport'),
      to: 'Support',
      handleAction: handleSupportAction,
    },
  ];

  return (
    <Container noBottomGradient>
      <Box flexGrow={1}>
        <FlatList
          data={options}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                item.handleAction
                  ? item.handleAction(() => navigate(item.to))
                  : navigate(item.to)
              }
              style={!item.isEnabled && { opacity: 0.3 }}
            >
              <Box flex row py={2}>
                <Text flexGrow={1}>{item.label}</Text>
                <Icon name="chevron-right" />
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
      <Button secondary onPress={signOut}>
        {t('general.signOut')}
      </Button>
      <Text
        type="secondary"
        fontFamily={FontFamily.SEMIBOLD}
        fontSize={12}
        textCenter
        mt={1}
      >
        {t('settings.screens.SettingMenu.version')}: {nativeApplicationVersion}
      </Text>
    </Container>
  );
};
