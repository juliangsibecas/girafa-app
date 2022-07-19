import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../theme';
import { UiKeys, useStyle } from '../../../ui';
import { Box } from '../../Box';
import { NativeSyntheticEvent, TargetedEvent } from 'react-native';
import { Text } from '../../Text';

type Props = UiKeys & {
  value: any;
  onChange: (value: any) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  options: Array<{ label: string; value: any }>;
};

export const Select: React.FC<Props> = ({
  value,
  onChange,
  onBlur,
  options,
  ...props
}) => {
  const { theme, isLightMode } = useTheme();

  return (
    <>
      <Box p={2} bgColor="disabled" color={isLightMode ? '#4F4F4F' : '#FFFFFF'}>
        <Text>Hola</Text>
      </Box>

      <Picker
        onBlur={onBlur}
        dropdownIconRippleColor={theme.palette.disabled.main}
        dropdownIconColor={theme.palette.text.secondary}
      ></Picker>
    </>
  );
};
