import { Text } from '../Text';

type Props = {
  title: string;
  subtitle?: string;
};

export const Header: React.FC<Props> = ({ title, subtitle }) => (
  <>
    <Text type="h2" textCenter mt={4} mb={3}>
      {title}
    </Text>
    {subtitle && (
      <Text textCenter mb={8}>
        {subtitle}
      </Text>
    )}
  </>
);
