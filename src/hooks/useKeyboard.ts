import { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, KeyboardEvent } from 'react-native';

export interface IUseKeyboard {
  keyboardWillShow?: (evt: KeyboardEvent) => void;
}

export const useKeyboard = (data?: IUseKeyboard) => {
  const keyboardHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      (evt) => {
        data?.keyboardWillShow?.(evt);
        keyboardWillShowHandler(evt);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHideHandler
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const keyboardWillShowHandler = (event: KeyboardEvent) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        useNativeDriver: false,
        duration: event.duration,
        toValue: event.endCoordinates.height - 70,
      }),
    ]).start();
  };

  const keyboardWillHideHandler = (event: KeyboardEvent) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        useNativeDriver: false,
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  };

  return { keyboardHeight };
};
