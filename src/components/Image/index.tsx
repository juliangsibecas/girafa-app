import React, { useState } from 'react';
import { Image as RNImage, ImageStyle } from 'react-native';
import { UiKeys, useStyle } from '../../ui';

type Props = UiKeys & {
  src: string | number;
  fallbackSrc?: string;
  style?: ImageStyle;
};

export const Image: React.FC<Props> = ({ src, fallbackSrc, ...props }) => {
  const [source, setSource] = useState(src);
  const isUri = typeof source === 'string';

  const style = useStyle(props) as ImageStyle;

  return (
    <RNImage
      source={isUri ? { uri: source as string } : (source as number)}
      style={style}
      onError={() => fallbackSrc && setSource(fallbackSrc)}
    />
  );
};
