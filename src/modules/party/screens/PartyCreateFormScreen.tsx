import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Container, ConfirmationModal } from '../../../components';
import { useModal } from '../../../hooks';
import { HomeStackScreenProps } from '../../../navigation';
import { PartyCreateForm } from '../components/PartyCreateForm';

export const PartyCreateFormScreen: React.FC = () => {
  const { goBack } =
    useNavigation<HomeStackScreenProps<'PartyCreateForm'>['navigation']>();
  const { isModalOpen, closeModal } = useModal(true);

  return (
    <Container noBottomGradient>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Boludo"
        body="No crees fiesta al pedo"
        confirm="Continuar"
        cancel="Volver"
        onConfirm={closeModal}
        onCancel={goBack}
      />
      <PartyCreateForm />
    </Container>
  );
};
