import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Share, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import {
  PartyAvailability,
  PartyGetByIdDocument,
  PartyGetByIdResponse,
  User,
  UserGetAttendedPartiesByIdDocument,
  UserGetByIdDocument,
  useUserChangeAttendingStateMutation,
} from '../../../api';
import { Box, Button, Icon, LabelValue, Text } from '../../../components';
import { HomeStackScreenProps } from '../../../navigation';
import { FontFamily } from '../../../theme';
import { formatDate } from '../../../utils';

import { useAuth } from '../../auth/hooks';
import { UserAvatar } from '../../user';

import { partyAvailabilityLabels } from '../utils';

import { PartyAvatar } from './PartyAvatar';
import { PartyInvite } from './PartyInvite';

type Props = {
  party: PartyGetByIdResponse;
};

export const PartyDetail: React.FC<Props> = ({ party }) => {
  const { navigate } =
    useNavigation<HomeStackScreenProps<'PartyDetail'>['navigation']>();
  const { userId } = useAuth();
  const [
    changeAttendingStateMutation,
    { loading: isChangeAttendingStateLoading },
  ] = useUserChangeAttendingStateMutation();

  const [isAttender, setIsAttender] = useState(party.isAttender);
  const [attenders, setAttenders] = useState(party.attenders);
  const [attendersCount, setAttendersCount] = useState(party.attendersCount);

  const [isInviteModalOpen, setInviteModalOpen] = useState(false);

  const canInvite =
    !party.isExpired &&
    (party.isOrganizer ||
      party.allowInvites ||
      party.availability === PartyAvailability.Public);

  const changeAttendingState = async () => {
    try {
      const res = await changeAttendingStateMutation({
        variables: { data: { partyId: party._id, state: !isAttender } },
        refetchQueries: [
          { query: PartyGetByIdDocument, variables: { id: party._id } },
          { query: UserGetByIdDocument, variables: { id: userId } },
          {
            query: UserGetAttendedPartiesByIdDocument,
            variables: { id: userId },
          },
        ],
      });

      if (res.errors) {
        throw new Error();
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
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar asistir a la fiesta',
      });
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
        <Box flexShrink={1} ml={2}>
          <Text type="h1">{party.name}</Text>
          <Text ml={0.2}>{partyAvailabilityLabels[party.availability]}</Text>
        </Box>
      </Box>
      <Box flex row mt={6}>
        <Box flex flexGrow={1}>
          <LabelValue label="Organizador" value={party.organizer.nickname} />
          <Box mt={4}>
            <LabelValue label="Fecha" value={formatDate(party.date)} />
          </Box>
        </Box>
        <Box flex flexGrow={1}>
          <LabelValue label="Dirección" value={party.address} />
          <Box mt={4}>
            <LabelValue
              label="Barra Libre"
              value={party.openBar ? 'Si' : 'No'}
            />
          </Box>
        </Box>
      </Box>
      <Box mt={4}>
        <LabelValue label="Descripción" value={party.description} />
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
            <TouchableOpacity
              onPress={() => navigate('PartyAttenders', { id: party._id })}
            >
              <Text type="secondary" fontFamily={FontFamily.LIGHT}>
                Ver todos
              </Text>
            </TouchableOpacity>
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
          isDisabled={party.isOrganizer || party.isExpired}
        >
          {!party.isExpired
            ? isAttender
              ? 'Asistiendo'
              : 'Asistir'
            : isAttender
            ? 'Asististe'
            : 'No asististe'}
        </Button>
        <Box mx={3}>
          <TouchableOpacity
            onPress={() => setInviteModalOpen(true)}
            disabled={!canInvite}
          >
            <Icon
              name="send"
              size={3}
              color={canInvite ? 'primary' : 'disabled'}
            />
          </TouchableOpacity>
        </Box>
        <Box mr={1}>
          <TouchableOpacity onPress={share} disabled={!canInvite}>
            <Icon
              name="share-2"
              size={3}
              color={canInvite ? 'primary' : 'disabled'}
            />
          </TouchableOpacity>
        </Box>
      </Box>
      <PartyInvite
        partyId={party._id}
        isOpen={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </>
  );
};
