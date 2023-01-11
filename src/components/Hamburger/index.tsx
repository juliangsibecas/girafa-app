import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';

interface IHamburger {
  onPress: () => void;
}

export const Hamburger: React.FC<IHamburger> = ({ onPress: handlePress }) => {
  return (
    <Button borderRadius={8} height={4} width={4} onPress={handlePress}>
      <Icon name="menu" color="background" weight={3} />
    </Button>
  );
};
