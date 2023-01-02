import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { ThemeContext } from './context';
import { RawThemeMode, ThemeMode } from './types';
import { getAutomaticTheme } from './utils';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error();

  return context;
};

export const useThemeMode = () => {
  const [isLoading, setLoading] = useState(true);
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.LIGHT);

  useEffect(() => {
    const getMode = async () => {
      const mode = await AsyncStorage.getItem('theme');
      if (mode) {
        if (mode === RawThemeMode.AUTO) {
          setMode(getAutomaticTheme());
        } else {
          setMode(mode as ThemeMode);
        }
      } else {
        setMode(
          Appearance.getColorScheme() === 'light'
            ? ThemeMode.LIGHT
            : ThemeMode.DARK
        );
      }

      setLoading(false);
    };

    getMode();
  }, []);

  return {
    isThemeModeLoading: isLoading,
    themeMode: mode,
  };
};
