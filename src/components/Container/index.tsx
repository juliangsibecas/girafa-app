import React from 'react';
import { ViewProps } from 'react-native';
import { UiKeys } from '../../ui';
import { Box } from '../Box';

type Props = ViewProps &
  UiKeys & {
    noHeader?: boolean;
    noBottomTab?: boolean;
  };

export const Container: React.FC<Props> = ({
  noHeader,
  noBottomTab,
  children,
  ...props
}) => (
  <Box
    flex
    column
    flexGrow={1}
    px={2}
    pt={noHeader ? 8 : 2}
    pb={noBottomTab ? 6 : 3}
    width="screen"
    bgColor="background"
    {...props}
  >
    {children}
  </Box>
);
