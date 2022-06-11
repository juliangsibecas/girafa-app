import { ViewStyle } from 'react-native';
import { FontFamily } from '../theme/text/types';

export type UiKeys = Partial<{
  position: ViewStyle['position'];

  top: number;
  bottom: number;
  left: number;
  right: number;

  m: number;
  mt: number;
  mb: number;
  ml: number;
  mr: number;
  mx: number;
  my: number;

  p: number;
  pt: number;
  pb: number;
  pl: number;
  pr: number;
  px: number;
  py: number;

  flex: boolean;
  flexGrow: number;
  row: boolean;
  column: boolean;

  bgColor: 'primary' | 'secondary' | 'background' | 'disabled' | string;
  borderRadius: number;

  vcenter: boolean;
  hcenter: boolean;
  center: boolean;

  fontFamily: FontFamily;
  textCenter: boolean;
  color: 'primary' | 'secondary' | 'background' | string;

  height: 'screen' | number;
  width: 'screen' | number;
  fullWidth: boolean;

  overflow: ViewStyle['overflow'];
}>;
