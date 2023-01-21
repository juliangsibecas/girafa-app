import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from '../Box';
import { Icon } from '../Icon';

interface ICheckBox {
  isChecked: boolean;
  onCheck?: () => void;
  onUncheck?: () => void;
  small?: boolean;
}

export const Checkbox: React.FC<ICheckBox> = ({
  isChecked,
  onCheck: handleCheck,
  onUncheck: handleUncheck,
  small,
}) => {
  const handlePress = () => (isChecked ? handleUncheck?.() : handleCheck?.());

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!handleCheck && !handleUncheck}
    >
      <Box
        flex
        center
        height={small ? 2 : 3}
        width={small ? 2 : 3}
        borderRadius={3}
        bgColor={isChecked ? 'primary' : undefined}
        borderColor="primary"
      >
        <Icon
          name="check"
          color="background"
          size={small ? 1 : 2}
          weight={small ? 5 : 4}
        />
      </Box>
    </TouchableOpacity>
  );
};
