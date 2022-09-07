import React, { useState } from 'react';
import { Image as RNImage, ImageStyle } from 'react-native';
import { useEffectExceptOnMount } from '../../hooks';
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

  useEffectExceptOnMount(() => {
    setSource(src);
  }, [src]);

  return (
    <RNImage
      source={
        isUri
          ? { uri: `${source as string}?t=${Date.now()}` }
          : (source as number)
      }
      style={{ ...style, ...props.style, aspectRatio: 1 }}
      onError={() => fallbackSrc && setSource(fallbackSrc)}
    />
  );
};
