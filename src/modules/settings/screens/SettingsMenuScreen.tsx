import React from 'react';
import { nativeApplicationVersion } from 'expo-application';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';

import { Box, Button, Container, Icon, Text } from '../../../components';
import { FontFamily } from '../../../theme';

import { useAuth } from '../../auth';
import { useTranslation } from 'react-i18next';
import { useFeatureToggle } from '../../featureToggle';
import { FeatureToggleName } from '../../../api';
import { SettingsStackParamList, SettingsStackScreenProps } from '../navigator';

interface IOption {
  isEnabled: boolean;
  label: string;
  to: keyof SettingsStackParamList;
  handleAction?: (action: () => void) => void;
  color?: string;
}

export const SettingsMenuScreen = () => {
  const { t } = useTranslation();
  const { isEnabled: isSupportEnabled, handleAction: handleSupportAction } =
    useFeatureToggle(FeatureToggleName.Mailing);
  const { isEnabled: isDeleteEnabled, handleAction: handleDeleteAction } =
    useFeatureToggle(FeatureToggleName.UserDelete);
  const navigation =
    useNavigation<SettingsStackScreenProps<'Menu'>['navigation']>();
  const { signOut } = useAuth();

  const { navigate } = navigation;

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
    {
      isEnabled: true,
      label: t('legal.terms'),
      to: 'Terms',
    },
    {
      isEnabled: isDeleteEnabled,
      label: t('settings.screens.SettingMenu.userDelete'),
      to: 'UserDelete',
      handleAction: handleDeleteAction,
      color: 'error',
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
                <Text flexGrow={1} color={item.color}>
                  {item.label}
                </Text>
                <Icon name="chevron-right" color={item.color} />
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
