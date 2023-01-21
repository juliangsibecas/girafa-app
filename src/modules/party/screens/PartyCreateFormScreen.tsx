import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUserCheckPartyValidatingQuery } from '../../../api';
import { Box, Container, Icon, StateHandler, Text } from '../../../components';
import { useConfirmationModal } from '../../../hooks';
import { HomeStackScreenProps } from '../../../navigation';
import { PartyCreateForm } from '../components/PartyCreateForm';

export const PartyCreateFormScreen: React.FC = () => {
  const { t } = useTranslation();
  const { goBack } =
    useNavigation<HomeStackScreenProps<'PartyCreateForm'>['navigation']>();
  const [confirmationModal] = useConfirmationModal({
    isOpen: true,
    title: t('party.components.Create.CautionModal.title'),
    body: t('party.components.Create.CautionModal.body'),
    confirm: t('general.continue'),
    cancel: t('general.goBack'),
    onCancel: goBack,
  });
  const {
    data,
    loading: isLoading,
    error,
  } = useUserCheckPartyValidatingQuery();

  return (
    <Container noBottomGradient>
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        {data?.userCheckPartyValidating ? (
          <Box flex={1} center px={4}>
            <Icon name="clock" size={10} color="warning" />
            <Text mt={2} textCenter>
              {t('party.components.Create.validating')}
            </Text>
          </Box>
        ) : (
          <>
            {confirmationModal}
            <PartyCreateForm />
          </>
        )}
      </StateHandler>
    </Container>
  );
};
