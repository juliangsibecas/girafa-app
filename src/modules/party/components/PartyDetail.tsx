import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Share, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import {
  FeatureToggleName,
  PartyAvailability,
  PartyGetByIdDocument,
  PartyGetByIdResponse,
  User,
  UserGetByIdDocument,
  useUserChangeAttendingStateMutation,
} from '../../../api';
import {
  Box,
  FeatureToggledButton,
  Icon,
  LabelValue,
  Text,
} from '../../../components';
import { HomeStackScreenProps } from '../../../navigation';
import { FontFamily } from '../../../theme';
import { formatDate } from '../../../utils';

import { useAuth } from '../../auth/hooks';
import { useFeatureToggle } from '../../featureToggle';
import { UserAvatar } from '../../user';

import { PartyAvatar } from './PartyAvatar';
import { PartyInvite } from './PartyInvite';

type Props = {
  party: PartyGetByIdResponse;
};

export const PartyDetail: React.FC<Props> = ({ party }) => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<HomeStackScreenProps<'PartyDetail'>['navigation']>();
  const { userId } = useAuth();
  const { isEnabled: isSearchAttendersEnabled } = useFeatureToggle(
    FeatureToggleName.PartySearchAttenders
  );
  const {
    isEnabled: isSearchFollowersToInviteEnabled,
    handleAction: handleSearchFollowersToInviteAction,
  } = useFeatureToggle(FeatureToggleName.UserSearchFollowersToInvite);
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

  const handleInvitePress = () =>
    handleSearchFollowersToInviteAction(() => setInviteModalOpen(true));

  return (
    <>
      <Box flex row hcenter mt={2}>
        <PartyAvatar
          id={party._id}
          height={10}
          width={10}
          placeholderSize={6}
        />
        <Box flexShrink={1} ml={2}>
          <Text type="h1">{party.name}</Text>
          <Text ml={0.2}>
            {t(`party.availabilities.${party.availability}`)}
          </Text>
        </Box>
      </Box>
      <Box flex row mt={6}>
        <Box flex flexGrow={1}>
          <LabelValue
            label={t('party.organizer')}
            value={party.organizer.nickname}
          />
          <Box mt={4}>
            <LabelValue
              label={t('general.date')}
              value={formatDate(party.date)}
            />
          </Box>
        </Box>
        <Box flex flexGrow={1}>
          <LabelValue label={t('party.address')} value={party.address} />
          <Box mt={4}>
            <LabelValue
              label={t('party.openBar')}
              value={party.openBar ? 'Si' : 'No'}
            />
          </Box>
        </Box>
      </Box>
      <Box mt={4}>
        <LabelValue label={t('party.description')} value={party.description} />
      </Box>
      <Box mt={4} flexGrow={1}>
        <Box flex row fullWidth>
          <Text fontFamily={FontFamily.LIGHT} type="secondary" mb={0.5}>
            {t('party.willAttend')}
          </Text>
          <Text fontFamily={FontFamily.SEMIBOLD} ml={1} flexGrow={1}>
            {attendersCount}
          </Text>
          {isSearchAttendersEnabled && attendersCount ? (
            <TouchableOpacity
              onPress={() => navigate('PartyAttenders', { id: party._id })}
            >
              <Text type="secondary" fontFamily={FontFamily.LIGHT}>
                {t('general.seeAll')}
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
        <FeatureToggledButton
          ft={FeatureToggleName.UserChangeAttendingState}
          flexGrow={1}
          secondary={isAttender}
          onPress={changeAttendingState}
          isLoading={isChangeAttendingStateLoading}
          isDisabled={party.isOrganizer || party.isExpired}
        >
          {t(
            `party.${
              !party.isExpired
                ? isAttender
                  ? 'attending'
                  : 'attend'
                : isAttender
                ? 'attended'
                : 'notAttended'
            }`
          )}
        </FeatureToggledButton>
        <Box mx={3}>
          <TouchableOpacity onPress={handleInvitePress} disabled={!canInvite}>
            <Icon
              name="send"
              size={3}
              color={
                isSearchFollowersToInviteEnabled && canInvite
                  ? 'primary'
                  : 'disabled'
              }
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
