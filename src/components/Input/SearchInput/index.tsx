import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../../../hooks';

import { UiKeys } from '../../../ui';

import { FeatureToggleTextInput } from '../FeatureToggleTextInput';
import { TextInput } from '../TextInput';

interface ISearchInput extends UiKeys {
  isFt?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onChangeText?: (text: string) => void;
  onChangeDebouncedText: (debouncedText: string) => void;
}

export const SearchInput: React.FC<ISearchInput> = ({
  isFt,
  isLoading,
  isDisabled,
  onChangeText,
  onChangeDebouncedText,
  ...props
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const Input = isFt ? FeatureToggleTextInput : TextInput;

  useDebounce({
    value,
    onDebounceChange: onChangeDebouncedText,
  });

  const handleChangeText = (text: string) => {
    setValue(text);
    onChangeText?.(text);
  };

  return (
    <Input
      placeholder={t('general.searchEllipsis')}
      value={value}
      onChangeText={handleChangeText}
      isDisabled={Boolean(isDisabled)}
      isLoading={Boolean(isLoading)}
      {...props}
    />
  );
};
