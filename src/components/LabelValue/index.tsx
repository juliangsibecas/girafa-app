import React from 'react';
import { FontFamily } from '../../theme/text/types';
import { Text } from '../Text';

type Props = {
  label: string;
  value: React.ReactNode;
};

export const LabelValue: React.FC<Props> = ({ label, value }) => (
  <>
    <Text type="secondary" fontFamily={FontFamily.LIGHT} mb={0.5}>
      {label}
    </Text>
    <Text>{value ?? '-'}</Text>
  </>
);
