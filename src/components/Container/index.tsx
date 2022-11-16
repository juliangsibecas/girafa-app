import React from 'react';
import { Keyboard, Pressable, ViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UiKeys } from '../../ui';
import { BottomTabGradient } from '../BottomTabGradient';
import { Box } from '../Box';

type Props = ViewProps &
  UiKeys & {
    noHeader?: boolean;
    noBottomTab?: boolean;
    noBottomGradient?: boolean;
    keyboard?: boolean;
    keyboardDismiss?: boolean;
  };

export const KeyboardDismissWrapper: React.FC<Props> = ({ children }) => (
  <Pressable
    style={{ flex: 1 }}
    onPress={() => {
      Keyboard.dismiss();
    }}
  >
    {children}
  </Pressable>
);

export const KeyboardScrollWrapper: React.FC<Props> = ({ children }) => (
  <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <KeyboardDismissWrapper>{children}</KeyboardDismissWrapper>
  </KeyboardAwareScrollView>
);

export const Container: React.FC<Props> = ({
  noHeader,
  noBottomTab,
  noBottomGradient,
  keyboard,
  keyboardDismiss,
  children,
  ...props
}) => {
  const Wrapper = keyboard
    ? KeyboardScrollWrapper
    : keyboardDismiss
    ? KeyboardDismissWrapper
    : React.Fragment;

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
