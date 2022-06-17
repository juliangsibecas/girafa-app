import React, { useState } from 'react';
import { Share, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {
  PartyGetByIdDocument,
  PartyGetByIdResponse,
  User,
  useUserChangeAttendingStateMutation,
} from '../../../api';
import { Box, Button, Icon, LabelValue, Text } from '../../../components';
import { FontFamily } from '../../../theme/text/types';
import { formatDate } from '../../../utils';
import { useAuth } from '../../auth/hooks';
import { UserAvatar } from '../../user';
import { PartyAvatar } from './PartyAvatar';

type Props = {
  party: PartyGetByIdResponse;
};

export const PartyDetail: React.FC<Props> = ({ party }) => {
  const { userId } = useAuth();
  const [
    changeAttendingStateMutation,
    { loading: isChangeAttendingStateLoading },
  ] = useUserChangeAttendingStateMutation();

  const [isAttender, setIsAttender] = useState(party.isAttender);
  const [attenders, setAttenders] = useState(party.attenders);
  const [attendersCount, setAttendersCount] = useState(party.attendersCount);

  const [isInviteModalOpen, setInviteModalOpen] = useState(false);

  const changeAttendingState = async () => {
    const res = await changeAttendingStateMutation({
      variables: { data: { partyId: party._id, state: !isAttender } },
      refetchQueries: [
        { query: PartyGetByIdDocument, variables: { id: party._id } },
      ],
    });

    if (res.errors) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar asistir a la fiesta',
      });

      return;
    }

    if (res.data?.userChangeAttendingState) {
      if (!isAttender) {
        setAttenders((attenders) => [{ _id: userId } as User, ...attenders]);
        setAttendersCount((attendersCount) => attendersCount + 1);
      } else {
        setAttenders((attenders) =>
          attenders.filter(({ _id }) => _id !== userId)
        );
        setAttendersCount((attendersCount) => attendersCount - 1);
      }

      setIsAttender(!isAttender);
    }
  };

  const share = async () => {
    await Share.share({
      message: `${party.name} schema://girafa/party/${party._id}`,
    });
  };

  return (
    <>
      <Box flex row hcenter mt={2}>
        <PartyAvatar id={party._id} height={10} width={10} />
        <Text type="h1" ml={2} flexShrink={1}>
          {party.name}
        </Text>
      </Box>
      <Box mt={6}>
        <Box flex row>
          <Box flexGrow={1}>
            <LabelValue label="Organizador" value={party.organizer.nickname} />
          </Box>
          <Box flexGrow={1}>
            <LabelValue label="Dirección" value={party.address} />
          </Box>
        </Box>
        <Box flex row mt={4}>
          <Box flexGrow={1}>
            <LabelValue label="Fecha" value={formatDate(party.date)} />
          </Box>
          <Box flexGrow={1}>
            <LabelValue
              label="Barra Libre"
              value={party.openBar ? 'Si' : 'No'}
            />
          </Box>
        </Box>
        <Box mt={4}>
          <LabelValue label="Descripción" value={party.description} />
        </Box>
      </Box>
      <Box mt={4} flexGrow={1}>
        <Box flex row fullWidth>
          <Text fontFamily={FontFamily.LIGHT} type="secondary" mb={0.5}>
            Asisitiran
          </Text>
          <Text fontFamily={FontFamily.SEMIBOLD} ml={1} flexGrow={1}>
            {attendersCount}
          </Text>
          {attendersCount ? (
            <Text type="secondary" fontFamily={FontFamily.LIGHT}>
              Ver todos
            </Text>
          ) : undefined}
        </Box>
        <Box flex row mt={0.5}>
          {attenders.map(({ _id }) => (
            <Box mr={0.5} key={_id}>
              <UserAvatar id={_id} />
            </Box>
          ))}
        </Box>
      </Box>
      <Box flex row center>
        <Button
          flexGrow={1}
          secondary={isAttender}
          onPress={changeAttendingState}
          isLoading={isChangeAttendingStateLoading}
        >
          {isAttender ? 'Asistiendo' : 'Asistir'}
        </Button>
        <Box mx={3}>
          <TouchableOpacity onPress={() => setInviteModalOpen(true)}>
            <Icon name="paper-plane" size={3} color="primary" />
          </TouchableOpacity>
        </Box>
        <Box mr={1}>
          <TouchableOpacity onPress={share}>
            <Icon name="share-alt" size={3} color="primary" />
          </TouchableOpacity>
        </Box>
      </Box>
      <Modal
        isVisible={isInviteModalOpen}
        onSwipeComplete={() => setInviteModalOpen(false)}
        swipeDirection={['down']}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <Box bgColor="background" py={8} px={4}>
          <Text>Invitar</Text>
        </Box>
      </Modal>
    </>
  );
};
