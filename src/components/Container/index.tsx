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
  };

export const ContainerWrapper: React.FC<Props> = ({ children }) => (
  <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {children}
    </Pressable>
  </KeyboardAwareScrollView>
);

export const Container: React.FC<Props> = ({
  noHeader,
  noBottomTab,
  noBottomGradient,
  keyboard,
  children,
  ...props
}) => {
  const Wrapper = keyboard ? ContainerWrapper : React.Fragment;

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
