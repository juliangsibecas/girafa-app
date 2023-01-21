import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Container, Text } from '../../../components';

import { terms } from '../terms/es.json';

export const TermsScreen = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'legal' });

  return (
    <Container pb={2}>
      <Text type="h3" mb={2}>
        {t('terms')}
      </Text>
      <ScrollView style={{ flex: 1 }}>
        <Text type="hint" lineHeight={16} color="text.secondary">
          {terms}
        </Text>
      </ScrollView>
    </Container>
  );
};
