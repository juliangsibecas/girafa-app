import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { ITextInput, TextInput } from '../TextInput';

export interface IFeatureToggleTextInput extends ITextInput {
  isDisabled: boolean;
  isLoading: boolean;
}

export const FeatureToggleTextInput: React.FC<IFeatureToggleTextInput> = ({
  isDisabled,
  isLoading,
  ...props
}) => {
  const { t } = useTranslation();

  const handlePress = () => {
    isDisabled &&
      Toast.show({ type: 'error', text1: t('api.featureToggleDisabled') });
  };

  return (
    <Pressable onPress={handlePress}>
      <TextInput {...props} isDisabled={isDisabled} />
    </Pressable>
  );
};
