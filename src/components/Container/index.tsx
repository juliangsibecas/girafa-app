import React from 'react';
import { Dimensions } from 'react-native';
import { UiKeys } from '../../ui';
import { Box } from '../Box';

interface Props extends UiKeys {
  noHeader?: boolean;
}

export const Container: React.FC<Props> = ({
  noHeader,
  children,
  ...props
}) => (
  <Box
    flex
    column
    flexGrow={1}
    px={2}
    pt={noHeader ? 8 : 2}
    pb={6}
    height={noHeader ? 'screen' : 10}
    width="screen"
    bgColor="background"
    {...props}
  >
    {children}
  </Box>
);
