import React, { useState } from 'react';
import { Image as RNImage, ImageStyle } from 'react-native';
import { UiKeys, useStyle } from '../../ui';

type Props = UiKeys & {
  src: string | number;
  fallbackSrc?: number;
  style?: ImageStyle;
};

export const Image: React.FC<Props> = ({ src, fallbackSrc, ...props }) => {
  const style = useStyle(props) as ImageStyle;
  const isUri = typeof src === 'string';
  const [source, setSource] = useState(
    isUri ? { uri: `${src as string}?t=${Date.now()}` } : (src as number)
  );

  const fallback = () => fallbackSrc && setSource(fallbackSrc);

  return (
    <RNImage
      key={Date.now()}
      source={source}
      onError={fallback}
      defaultSource={fallbackSrc}
      style={{
        ...style,
        ...props.style,
        aspectRatio: 1,
      }}
    />
  );
};
