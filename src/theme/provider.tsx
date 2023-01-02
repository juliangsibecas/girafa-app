import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ThemeContext } from './context';
import { RawThemeMode, Theme, ThemeMode } from './types';
import { getAutomaticTheme } from './utils';

type Props = {
  children: React.ReactNode;
  theme: (mode: ThemeMode) => Theme;
  mode?: ThemeMode;
};

export const ThemeProvider: React.FC<Props> = ({
  children,
  theme,
  mode: themeMode = ThemeMode.LIGHT,
}) => {
  const [rawMode, setRawMode] = useState<RawThemeMode>(
    themeMode as unknown as RawThemeMode
  );
  const [mode, setMode] = useState<ThemeMode>(themeMode);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (rawMode === RawThemeMode.AUTO) {
      interval = setInterval(() => {
        if (rawMode !== RawThemeMode.AUTO) clearInterval(interval);

        setMode(getAutomaticTheme());
      }, 60000);
    }

    return () => clearInterval(interval);
  }, [rawMode]);

  const changeThemeMode = async (mode: RawThemeMode | ThemeMode) => {
    await AsyncStorage.setItem('theme', mode);

    setRawMode(mode as unknown as RawThemeMode);
    setMode(
      mode === RawThemeMode.AUTO
        ? getAutomaticTheme()
        : (mode as unknown as ThemeMode)
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: theme(mode),
        mode,
        rawMode,
        isLightMode: mode === ThemeMode.LIGHT,
        changeThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
