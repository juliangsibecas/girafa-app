import React from 'react';
import { useTranslation } from 'react-i18next';

import { BottomModal, Text } from '../../../../components';

import { terms } from '../../terms/es.json';

export const TermsBottomModal = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'legal' });

  return (
    <BottomModal isOpen={true} onClose={() => {}}>
      <Text type="h2">{t('terms')}</Text>
      <Text>{terms}</Text>
    </BottomModal>
  );
};
