import { Box } from '../Box';
import { Spinner } from '../Spinner';
import { Text } from '../Text';

type Props = {
  isLoading?: boolean;
  isError?: boolean;
};

export const StateHandler: React.FC<Props> = ({
  isLoading,
  isError,
  children,
}) => {
  if (isLoading || isError) {
    return (
      <Box flexGrow={1} bgColor="background" vcenter>
        {isLoading && <Spinner />}
        {isError && <Text>Error</Text>}
      </Box>
    );
  }

  return children;
};
