import React from 'react';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { UiKeys, useStyle } from '../../ui';

type Props = UiKeys & {
  src: string | number;
  fallbackSrc?: number;
  style?: ImageStyle;
};

export const Image: React.FC<Props> = ({ src, fallbackSrc, ...props }) => {
  const isUri = typeof src === 'string';

  const style = useStyle(props) as ImageStyle;

  return (
    <FastImage
      source={
        isUri ? { uri: `${src as string}?t=${Date.now()}` } : (src as number)
      }
      style={{ ...style, ...props.style, aspectRatio: 1 }}
      fallback
      defaultSource={require('../../../assets/images/user.png')}
    />
  );
};
