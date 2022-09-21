import React from 'react';
import { ImageStyle } from 'react-native';
import { UiKeys, useStyle } from '../../ui';
import { Image } from '../Image';

type Props = UiKeys & {
  src: string;
  fallbackSrc?: number;
  style?: ImageStyle;
};

export const Avatar: React.FC<Props> = ({ src, fallbackSrc, ...props }) => {
  const style = useStyle(props) as ImageStyle;

  return (
    <Image
      src={src}
      fallbackSrc={fallbackSrc}
      height={props.height ?? 5}
      width={props.width ?? 5}
      borderRadius={props.borderRadius ?? 2}
      style={{ ...style, ...props.style }}
    />
  );
};
