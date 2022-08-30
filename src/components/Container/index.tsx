import React from 'react';
import { ViewProps } from 'react-native';
import { UiKeys } from '../../ui';
import { BottomTabGradient } from '../BottomTabGradient';
import { Box } from '../Box';

type Props = ViewProps &
  UiKeys & {
    noHeader?: boolean;
    noBottomTab?: boolean;
    noBottomGradient?: boolean;
  };

export const Container: React.FC<Props> = ({
  noHeader,
  noBottomTab,
  noBottomGradient,
  children,
  ...props
}) => (
  <>
    <Box
      flex
      column
      flexGrow={1}
      flexShrink={1}
      px={2}
      pt={noHeader ? 10 : 2}
      pb={noBottomTab ? 6 : 1}
      width="screen"
      bgColor="background"
      {...props}
    >
      {children}
      {!noBottomGradient ? <BottomTabGradient /> : undefined}
    </Box>
  </>
);
