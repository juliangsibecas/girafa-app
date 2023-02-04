import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Share, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import {
  FeatureToggleName,
  PartyAvailability,
  PartyGetDocument,
  PartyGetResponse,
  PartyStatus,
  User,
  UserGetDocument,
  useUserChangeAttendingStateMutation,
} from '../../../api';
import {
  Box,
  FeatureToggledButton,
  Icon,
  LabelValue,
  Text,
} from '../../../components';
import { CoreStackGroupScreenProps } from '../../../navigation/CoreStackGroup';
import { FontFamily } from '../../../theme';
import { formatDate } from '../../../utils';

import { useAuth } from '../../auth/hooks';
import { useFeatureToggle } from '../../featureToggle';
import { useUser } from '../../user/hooks';
import { UserAvatar } from '../../user/components';

import { PartyAvatar } from './PartyAvatar';
import { PartyInvite } from './PartyInvite';

type Props = {
  party: PartyGetResponse;
};

export const PartyDetail: React.FC<Props> = ({ party }) => {
  const { t } = useTranslation();
  const { push } =
    useNavigation<CoreStackGroupScreenProps<'PartyDetail'>['navigation']>();
  const { userId } = useAuth();
  const { user } = useUser();
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
    party.status === PartyStatus.Enabled &&
    (party.isOrganizer ||
      party.allowInvites ||
      party.availability === PartyAvailability.Public);

  const changeAttendingState = async () => {
    try {
      if (!user) return;

      const res = await changeAttendingStateMutation({
        variables: { data: { partyId: party._id, state: !isAttender } },
        refetchQueries: [
          { query: PartyGetDocument, variables: { id: party._id } },
          { query: UserGetDocument, variables: { data: { id: userId } } },
        ],
      });

      if (res.errors) {
        throw new Error();
      }

      if (res.data?.userChangeAttendingState) {
        if (!isAttender) {
          setAttenders((attenders) => [user as unknown as User, ...attenders]);
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
      message: t('party.components.Detail.share', { slug: party.slug }),
    });
  };

  const handleInvitePress = () =>
    handleSearchFollowersToInviteAction(() => setInviteModalOpen(true));

  return (
    <>
      <Box row hcenter mt={2}>
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
      <Box row mt={6}>
        <Box flex={1}>
          <LabelValue
            label={t('party.organizer')}
            value={party.organizer?.nickname}
          />
          <Box mt={4}>
            <LabelValue
              label={t('general.date')}
              value={formatDate(party.date)}
            />
          </Box>
        </Box>
        <Box flex={1}>
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
      <Box mt={4} flex={1}>
        <Box row fullWidth>
          <Text fontFamily={FontFamily.LIGHT} type="secondary" mb={0.5}>
            {t('party.willAttend')}
          </Text>
          <Text fontFamily={FontFamily.SEMIBOLD} ml={1} flex={1}>
            {attendersCount}
          </Text>
          {!!(isSearchAttendersEnabled && attendersCount) && (
            <TouchableOpacity
              onPress={() => push('PartyAttenders', { id: party._id })}
            >
              <Text type="secondary" fontFamily={FontFamily.LIGHT}>
                {t('general.seeAll')}
              </Text>
            </TouchableOpacity>
          )}
        </Box>
        <Box row mt={0.5}>
          {attenders.map(({ _id, pictureId }) => (
            <Box mr={0.5} key={_id}>
              <UserAvatar id={pictureId} />
            </Box>
          ))}
        </Box>
      </Box>
      <Box row center>
        <FeatureToggledButton
          ft={FeatureToggleName.UserChangeAttendingState}
          flex={1}
          secondary={isAttender}
          onPress={changeAttendingState}
          isLoading={isChangeAttendingStateLoading}
          isDisabled={party.isOrganizer || party.status === PartyStatus.Expired}
        >
          {t(
            `party.${
              party.status === PartyStatus.Enabled
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
