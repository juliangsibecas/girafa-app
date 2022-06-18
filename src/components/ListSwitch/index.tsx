import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from '../Box';
import { Icon } from '../Icon';

type Props = {
  isCards: boolean;
  onSwitch: () => void;
};

export const ListSwitch: React.FC<Props> = ({ isCards, onSwitch }) => (
  <Box flex width={3} center>
    <TouchableOpacity onPress={onSwitch}>
      <Icon name={isCards ? 'list' : 'id-badge'} size={2.5} color="primary" />
    </TouchableOpacity>
  </Box>
);
