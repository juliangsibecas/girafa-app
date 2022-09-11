import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../../../components';
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

  return (
    <Container noBottomGradient>
      {confirmationModal}
      <PartyCreateForm />
    </Container>
  );
};
