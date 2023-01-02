import React from 'react';
import moment from 'moment';
import { Image as RNImage, ImageStyle } from 'react-native';
import { UiKeys, useStyle } from '../../ui';

type Props = UiKeys & {
  src: number;
  style?: ImageStyle;
};

export const Image: React.FC<Props> = ({ src, ...props }) => {
  const style = useStyle(props) as ImageStyle;

  return (
    <RNImage
      key={moment.now()}
      source={src}
      style={{
        ...style,
        ...props.style,
        aspectRatio: 1,
      }}
    />
  );
};
