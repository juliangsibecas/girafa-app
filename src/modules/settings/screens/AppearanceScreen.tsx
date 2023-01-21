import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

import { Box, Container, Header, IBox, Icon, Text } from '../../../components';
import { ThemeMode, useTheme } from '../../../theme';
import { darkPalette, lightPalette, Palette } from '../../../theme/palette';
import { RawThemeMode } from '../../../theme/types';
import { PickEnum } from '../../../types';

interface IExampleBox extends IBox {
  palette: Palette;
  mode: PickEnum<ThemeMode, ThemeMode.LIGHT | ThemeMode.DARK>;
}

const ExampleBox: React.FC<IExampleBox> = ({ palette, mode, ...props }) => {
  const { t } = useTranslation();
  const { rawMode, changeThemeMode } = useTheme();

  const handlePress = () => changeThemeMode(mode);

  const isActive = rawMode === (mode as any);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box
        p={2}
        borderRadius={1}
        borderWidth={isActive ? 1 : undefined}
        borderColor={isActive ? palette.success.main : undefined}
        bgColor={palette.disabled.main}
        pointerEvents="none"
        {...props}
      >
        <Box
          p={2}
          row
          bgColor={palette.background.main}
          borderRadius={1}
          style={{ justifyContent: 'space-between' }}
        >
          <Box>
            <Text type="h3" color={palette.text.primary}>
              {t(`settings.screens.Appearance.${mode}Title`)}
            </Text>
            <Text type="hint" color={lightPalette.text.secondary} mt={0.5}>
              {t(`settings.screens.Appearance.${mode}Description`)}
            </Text>
          </Box>
          <TouchableOpacity
            style={{
              backgroundColor: palette.primary.main,
              justifyContent: 'center',
              borderRadius: 10,
            }}
          >
            <Box height={2} px={1.5}>
              <Icon name="user" color={palette.background.main} />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const ExampleAutomaticBox: React.FC<IBox> = (props) => {
  const { t } = useTranslation();
  const { rawMode, changeThemeMode } = useTheme();

  const handlePress = () => changeThemeMode(RawThemeMode.AUTO);

  const isActive = rawMode === RawThemeMode.AUTO;

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box
        borderRadius={1}
        borderWidth={isActive ? 1 : undefined}
        borderColor={isActive ? lightPalette.success.main : undefined}
        overflow="hidden"
        {...props}
      >
        <Box row>
          <Box p={2} flex={1} bgColor={lightPalette.disabled.main}>
            <Box p={2} bgColor={lightPalette.background.main} borderRadius={1}>
              <Text type="h3" color={lightPalette.text.primary}>
                {t('settings.screens.Appearance.AutoLightTitle')}
              </Text>
              <Text type="hint" color={lightPalette.text.secondary} mt={0.5}>
                {t('settings.screens.Appearance.AutoLightDescription')}
              </Text>
            </Box>
          </Box>
          <Box p={2} flex={1} bgColor={darkPalette.disabled.main}>
            <Box
              flex={1}
              p={2}
              bgColor={darkPalette.background.main}
              borderRadius={1}
            >
              <Text type="h3" color={darkPalette.text.primary}>
                {t('settings.screens.Appearance.AutoDarkTitle')}
              </Text>
              <Text type="hint" color={darkPalette.text.secondary} mt={0.5}>
                {t('settings.screens.Appearance.AutoDarkDescription')}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export const AppearanceScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container noBottomGradient keyboard>
      <Header title={t('settings.screens.Appearance.title')} />
      <ExampleAutomaticBox mt={6} />
      <ExampleBox mt={2} palette={lightPalette} mode={ThemeMode.LIGHT} />
      <ExampleBox mt={2} palette={darkPalette} mode={ThemeMode.DARK} />
    </Container>
  );
};
