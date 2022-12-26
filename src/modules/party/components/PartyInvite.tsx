import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View } from 'react-native';

import {
  useResponse,
  useUserSearchFollowersToInviteQuery,
  useUserSendPartyInviteMutation,
} from '../../../api';
import {
  BottomModal,
  Box,
  Button,
  Checkbox,
  Icon,
  StateHandler,
  Text,
  TextInput,
} from '../../../components';
import { useDebounce, useEffectExceptOnMount } from '../../../hooks';

import { FontFamily } from '../../../theme/text/types';
import { UserAvatar } from '../../user/comonents';

type ItemProps = {
  user: any;
  selectedUserIds: Record<string, boolean>;
  add: (userId: string) => void;
  remove: (userId: string) => void;
};

const PartyInviteItem: React.FC<ItemProps> = ({
  user,
  selectedUserIds,
  add,
  remove,
}) => {
  const isChecked = Boolean(selectedUserIds[user._id]);

  const handlePress = () => (!isChecked ? add(user._id) : remove(user._id));

  return (
    <View onStartShouldSetResponder={() => true}>
      <TouchableOpacity onPress={handlePress}>
        <Box flex row hcenter mb={1.5}>
          <UserAvatar id={user._id} />
          <Box flexGrow={1}>
            <Text ml={2} fontFamily={FontFamily.BOLD}>
              {user.nickname}
            </Text>
            <Text ml={2}>{user.fullName}</Text>
          </Box>
          <Checkbox isChecked={isChecked} />
        </Box>
      </TouchableOpacity>
    </View>
  );
};

type Props = {
  partyId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const PartyInvite: React.FC<Props> = ({ partyId, isOpen, onClose }) => {
  const { t } = useTranslation();
  const { onSuccess, onError } = useResponse();
  const {
    data,
    loading: isLoading,
    error,
    refetch,
  } = useUserSearchFollowersToInviteQuery({
    variables: {
      data: {
        partyId,
      },
    },
    skip: !isOpen,
  });

  const [sendInvite, { loading: isSendInviteLoading }] =
    useUserSendPartyInviteMutation();

  const [selectedUsersId, setSelectedUsersId] = useState<
    Record<string, boolean>
  >({});
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search);

  const users = data?.userSearchFollowersToInvite ?? [];

  useEffectExceptOnMount(() => {
    refetch({ data: { partyId, q: debouncedSearch } });
  }, [debouncedSearch]);

  const addUserId = (userId: string) =>
    setSelectedUsersId({ ...selectedUsersId, [userId]: true });

  const removeUserId = (userId: string) => {
    const obj = { ...selectedUsersId };
    delete obj[userId];

    setSelectedUsersId(obj);
  };

  const handleSubmit = async () => {
    try {
      const invitedId = Object.keys(selectedUsersId);
      const res = await sendInvite({
        variables: { data: { partyId: partyId, invitedId } },
      });

      onClose();

      if (res.errors || !res.data?.userSendPartyInvite) {
        throw new Error();
      } else {
        setSelectedUsersId({});
        onSuccess();
      }
    } catch (e) {
      onError();
    }
  };

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <Box flex row mb={2} style={{ alignItems: 'baseline' }}>
        <Text type="h2" flexGrow={1}>
          {t('party.components.Invite.invite')}
        </Text>
        <Text type="secondary">
          {t('party.components.Invite.onlyFollowersAllowed')}
        </Text>
      </Box>
      <TextInput
        placeholder={t('general.searchEllipsis')}
        value={search}
        onChangeText={(text) => setSearch(text)}
        mb={4}
      />
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        <Box height={15} center>
          {users.length ? (
            <FlatList
              style={{ height: '100%', width: '100%' }}
              data={users}
              renderItem={({ item }) => (
                <PartyInviteItem
                  user={item}
                  selectedUserIds={selectedUsersId}
                  add={addUserId}
                  remove={removeUserId}
                />
              )}
            />
          ) : (
            <Box flex row>
              <Icon name="warning" color="warning" mr={1} />
              <Text>{t('party.components.Invite.emptyText')}</Text>
            </Box>
          )}
        </Box>
      </StateHandler>
      <Button
        mt={4}
        isLoading={isSendInviteLoading}
        onPress={handleSubmit}
        isDisabled={Object.keys(selectedUsersId).length === 0}
      >
        {t('party.components.Invite.sendInvitations')}
      </Button>
    </BottomModal>
  );
};
