import { ThemeContext } from './context';
import { Theme, ThemeMode } from './types';

type Props = {
  theme: (mode: ThemeMode) => Theme;
  mode?: ThemeMode;
};

export const ThemeProvider: React.FC<Props> = ({
  children,
  theme,
  mode = ThemeMode.LIGHT,
}) => {
  return (
    <ThemeContext.Provider
      value={{
        theme: theme(mode),
        mode,
        isLightMode: mode === ThemeMode.LIGHT,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
