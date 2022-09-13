import React from 'react';
import { Keyboard, Pressable, ViewProps } from 'react-native';
import { UiKeys } from '../../ui';
import { BottomTabGradient } from '../BottomTabGradient';
import { Box } from '../Box';

type Props = ViewProps &
  UiKeys & {
    noHeader?: boolean;
    noBottomTab?: boolean;
    noBottomGradient?: boolean;
    keyboardDismiss?: boolean;
  };

export const ContainerWrapper: React.FC<Props> = ({ children }) => (
  <Pressable
    style={{ height: '100%' }}
    onPress={() => {
      Keyboard.dismiss();
    }}
  >
    {children}
  </Pressable>
);
export const Container: React.FC<Props> = ({
  noHeader,
  noBottomTab,
  noBottomGradient,
  keyboardDismiss,
  children,
  ...props
}) => {
  const Wrapper = keyboardDismiss ? ContainerWrapper : React.Fragment;

  return (
    <Wrapper>
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
        <>
          {children}
          {!noBottomTab && !noBottomGradient ? (
            <BottomTabGradient />
          ) : undefined}
        </>
      </Box>
    </Wrapper>
  );
};
