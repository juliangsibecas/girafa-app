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
  flexShrink: number;
  row: boolean;
  column: boolean;

  bgColor: string;

  borderRadius: number;
  borderColor: string;
  borderWidth: number;
  borderStyle: ViewStyle['borderStyle'];

  vcenter: boolean;
  hcenter: boolean;
  center: boolean;

  fontFamily: FontFamily;
  textCenter: boolean;
  color: string;

  height: 'screen' | number;
  width: 'screen' | number;
  minHeight: number;
  minWidth: number;
  fullWidth: boolean;

  overflow: ViewStyle['overflow'];
}>;
