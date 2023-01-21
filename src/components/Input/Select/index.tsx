import React, { useMemo } from 'react';
import {
  NativeSyntheticEvent,
  TargetedEvent,
  TouchableOpacity,
} from 'react-native';

import { UiKeys } from '../../../ui';

import { Box } from '../../Box';
import { Text } from '../../Text';
import { Icon } from '../../Icon';
import { BottomModal } from '../../Modal';
import { useModal } from '../../../hooks';

type Props = UiKeys & {
  placeholder: string;
  value: any;
  onChange: (value: any) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  options: Array<{ label: string; value: any }>;
};

export const Select: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  options,
  ...props
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const label = useMemo(
    () => options.find((option) => option.value === value)?.label,
    [value]
  );

  const handleChange = (newValue: any) => {
    onChange(newValue);
    closeModal();
  };

  return (
    <>
      <TouchableOpacity style={{ flexGrow: 1 }} onPress={openModal}>
        <Box
          borderRadius={1}
          overflow="hidden"
          bgColor="disabled"
          p={2}
          hcenter
          row
          {...props}
        >
          <Text type={label ? 'primary' : 'secondary'} flex={1}>
            {label ?? placeholder}
          </Text>
          <Icon name="chevron-down" color="primary" />
        </Box>
      </TouchableOpacity>
      <BottomModal isOpen={isModalOpen} onClose={closeModal}>
        <Text type="secondary">{placeholder}</Text>
        {options.map((option, i) => (
          <TouchableOpacity key={i} onPress={() => handleChange(option.value)}>
            <Text mt={3} fontSize={16}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </BottomModal>
    </>
  );
};
