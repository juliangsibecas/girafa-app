import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from '../Box';
import { Icon } from '../Icon';

type Props = {
  isCards: boolean;
  onSwitch: () => void;
  isDisabled?: boolean;
};

export const ListSwitch: React.FC<Props> = ({
  isCards,
  onSwitch,
  isDisabled,
}) => (
  <Box flex width={3} center>
    <TouchableOpacity onPress={onSwitch} disabled={isDisabled}>
      <Icon
        name={isCards ? 'list' : 'id-badge'}
        size={2.5}
        color={isDisabled ? 'disabled' : 'primary'}
      />
    </TouchableOpacity>
  </Box>
);
