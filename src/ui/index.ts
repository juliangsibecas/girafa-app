import { Dimensions, TextStyle, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { Palette } from '../theme/palette';
import { UiKeys } from './types';

type Style = ViewStyle & TextStyle;

function formatColor(palette: Palette, color: string) {
  return color.startsWith('#') ? color : palette[color as 'primary'].main;
}

export const useStyle = (keys: UiKeys, baseStyle: Style = {}) => {
  const { theme } = useTheme();

  const style: Style = { ...baseStyle };

  const spacing = (n?: number) => (n ? theme.spacing(n) : n);

  style.position = keys.position;
  style.top = spacing(keys.top);
  style.bottom = spacing(keys.bottom);
  style.left = spacing(keys.left);
  style.right = spacing(keys.right);

  style.margin = spacing(keys.m);
  style.marginTop = spacing(keys.my ?? keys.mt);
  style.marginBottom = spacing(keys.my ?? keys.mb);
  style.marginRight = spacing(keys.mx ?? keys.mr);
  style.marginLeft = spacing(keys.mx ?? keys.ml);

  style.padding = spacing(keys.p);
  style.paddingTop = spacing(keys.py ?? keys.pt);
  style.paddingBottom = spacing(keys.py ?? keys.pb);
  style.paddingRight = spacing(keys.px ?? keys.pr);
  style.paddingLeft = spacing(keys.px ?? keys.pl);

  style.display = keys.flex ? 'flex' : undefined;
  style.flexGrow = keys.flexGrow;
  style.flexDirection = keys.column ? 'column' : keys.row ? 'row' : undefined;

  style.backgroundColor = keys.bgColor
    ? formatColor(theme.palette, keys.bgColor)
    : baseStyle.backgroundColor;
  style.borderRadius = keys.borderRadius
    ? keys.borderRadius * theme.shape.borderRadiues
    : undefined;

  style.color = keys.color
    ? formatColor(theme.palette, keys.color)
    : baseStyle.color;
  style.textAlign = keys.textCenter ? 'center' : 'left';
  style.fontFamily = keys.fontFamily ?? baseStyle.fontFamily;

  style.height =
    keys.height === 'screen'
      ? Dimensions.get('screen').height -
        (style.paddingTop ?? 0) -
        (style.paddingBottom ?? 0)
      : spacing(keys.height) ?? baseStyle.height;

  style.width =
    keys.width === 'screen'
      ? Dimensions.get('screen').width
      : spacing(keys.width) ?? baseStyle.width;

  style.alignItems =
    keys.hcenter || keys.center ? 'center' : baseStyle.alignItems;
  style.justifyContent =
    keys.vcenter || keys.center ? 'center' : baseStyle.justifyContent;

  style.overflow = keys.overflow;

  return style;
};

export { UiKeys };
