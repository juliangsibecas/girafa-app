import React from 'react';
import moment from 'moment';
import { Image as RNImage, ImageStyle } from 'react-native';
import { UiKeys, useStyle } from '../../ui';

type Props = UiKeys & {
  src: string | number;
  style?: ImageStyle;
};

export const Image: React.FC<Props> = ({ src, ...props }) => {
  const style = useStyle(props) as ImageStyle;
  const isUri = typeof src === 'string';

  return (
    <RNImage
      key={moment.now()}
      source={isUri ? { uri: `${src as string}?v=${moment.now()}` } : src}
      style={{
        ...style,
        ...props.style,
        aspectRatio: 1,
      }}
    />
  );
};
