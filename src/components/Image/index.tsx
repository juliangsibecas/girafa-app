import React from 'react';
import { Image as RNImage, ImageStyle } from 'react-native';
import { UiKeys, useStyle } from '../../ui';

type Props = UiKeys & {
  src: string | number;
  style?: ImageStyle;
};

export const Image: React.FC<Props> = ({ src, ...props }) => {
  const style = useStyle(props) as ImageStyle;

  return (
    <RNImage
      source={typeof src === 'string' ? { uri: src } : src}
      style={{
        ...style,
        ...props.style,
        aspectRatio: 1,
      }}
    />
  );
};
