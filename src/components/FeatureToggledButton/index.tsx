import { Button, IButton } from '../Button';

import { FeatureToggleName } from '../../api';
import { useFeatureToggle } from '../../modules/featureToggle';

interface IFeatureToggledButton extends IButton {
  ft: FeatureToggleName;
}

export const FeatureToggledButton: React.FC<IFeatureToggledButton> = ({
  ft,
  isLoading,
  onPress,
  ...props
}) => {
  const {
    isEnabled: isFTEnabled,
    isLoading: isFTLoading,
    handleAction,
  } = useFeatureToggle(ft);

  const handlePress = () => handleAction(onPress as () => void);

  return (
    <Button
      isLoading={isLoading || isFTLoading}
      showAsDisabled={!isFTEnabled}
      onPress={handlePress}
      {...props}
    />
  );
};
