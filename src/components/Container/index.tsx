import React from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { Keyboard, Pressable, ViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useTheme } from '../../theme';
import { UiKeys } from '../../ui';
import { insertObjectIf } from '../../utils';

import { BottomTabGradient } from '../BottomTabGradient';
import { Box } from '../Box';

type Props = ViewProps &
  UiKeys & {
    noHeader?: boolean;
    headerPlaceholder?: boolean;
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

export const KeyboardScrollWrapper: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      style={{ backgroundColor: theme.palette.background.main }}
    >
      <KeyboardDismissWrapper>{children}</KeyboardDismissWrapper>
    </KeyboardAwareScrollView>
  );
};

export const Container: React.FC<Props> = ({
  noHeader,
  headerPlaceholder,
  noBottomTab,
  noBottomGradient,
  keyboard,
  keyboardDismiss,
  children,
  ...props
}) => {
  const headerHeight = useHeaderHeight();
  const Wrapper = keyboard
    ? KeyboardScrollWrapper
    : keyboardDismiss
    ? KeyboardDismissWrapper
    : React.Fragment;

  return (
    <Wrapper>
      <Box
        flexGrow={1}
        px={2}
        pt={noHeader ? 10 : 2}
        pb={noBottomTab ? 6 : 1}
        width="screen"
        bgColor="background"
        style={{
          ...insertObjectIf(headerPlaceholder, {
            paddingTop: headerPlaceholder ? headerHeight : undefined,
          }),
        }}
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
