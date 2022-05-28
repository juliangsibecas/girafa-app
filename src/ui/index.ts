import { ViewStyle } from 'react-native';
import { UiKeys } from './types';

export const createStyle = (keys: UiKeys) => {
  const style: ViewStyle = {};

  style.margin = keys.m;
  style.marginTop = keys.my ?? keys.mt;
  style.marginBottom = keys.my ?? keys.mb;
  style.marginRight = keys.mx ?? keys.mr;
  style.marginLeft = keys.mx ?? keys.ml;

  return style;
};

export { UiKeys };
