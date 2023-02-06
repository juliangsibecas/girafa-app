import React, { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { useTheme } from '../../theme';

import { UiKeys, useStyle } from '../../ui';

type Props = UiKeys & {
  src: string;
  style?: ImageStyle;
};

export const ExternalImage: React.FC<Props> = ({ src, ...props }) => {
  const [isLoading, setLoading] = useState(true);
  const style = useStyle(props) as ImageStyle;
  const { theme } = useTheme();

  return (
    <>
      {isLoading && (
        <ContentLoader
          backgroundColor={theme.palette.disabled.main}
          foregroundColor={theme.palette.disabled.dark}
          style={{
            ...style,
            ...props.style,
          }}
        >
          <Rect height="100%" width="100%" />
        </ContentLoader>
      )}
      <FastImage
        source={{ uri: src }}
        onLoadEnd={() => setLoading(false)}
        style={{
          ...style,
          ...props.style,
        }}
      />
    </>
  );
};
