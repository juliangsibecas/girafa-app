import React from 'react';
import { ImageStyle } from 'react-native';
import { UiKeys, useStyle } from '../../ui';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { Image } from '../Image';

type Props = UiKeys & {
  type: 'user' | 'party';
  src: string;
  placeholderSize?: number;
  style?: ImageStyle;
};

export const Avatar: React.FC<Props> = ({ type, src, ...props }) => {
  const style = useStyle(props) as ImageStyle;
  const placeholderSize = props.placeholderSize ?? 3;
  const height = props.height ?? 5;
  const width = props.width ?? 5;
  const borderRadius = props.borderRadius ?? 2;

  return (
    <Box
      height={height}
      width={width}
      borderRadius={borderRadius}
      overflow="hidden"
      style={{ ...style, ...props.style, ...{ aspectRatio: 1 } }}
    >
      <Image
        src={src}
        height={height}
        width={width}
        borderRadius={borderRadius}
        style={{ ...style, ...props.style }}
      />
      <Box
        position="absolute"
        bgColor="background.light"
        flex
        center
        style={{ height: '100%', width: '100%' }}
      >
        <Icon
          name={type}
          color="primary"
          size={placeholderSize}
          isFilled={type === 'party'}
          noStroke={type === 'party'}
        />
      </Box>
    </Box>
  );
};
