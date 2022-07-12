import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTheme } from '../../theme';
import { Box } from '../Box';

export const BottomTabGradient = () => {
  const { theme } = useTheme();

  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      height={6}
      width="screen"
      pointerEvents="none"
    >
      <LinearGradient
        colors={['transparent', theme.palette.background.main]}
        locations={[0, 1]}
        style={{ height: '100%' }}
      />
    </Box>
  );
};
