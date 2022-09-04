import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  useUserSearchFollowersToInviteQuery,
  useUserSendPartyInviteMutation,
} from '../../../api';
import {
  Box,
  Button,
  Icon,
  StateHandler,
  Text,
  TextInput,
} from '../../../components';
import { BottomModal } from '../../../components/Modal';
import { useDebounce, useEffectExceptOnMount } from '../../../hooks';
import { FontFamily } from '../../../theme/text/types';
import { UserAvatar } from '../../user';

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

  return (
    <View onStartShouldSetResponder={() => true}>
      <Box flex row hcenter mb={1.5}>
        <UserAvatar id={user._id} />
        <Box flexGrow={1}>
          <Text ml={2} fontFamily={FontFamily.BOLD}>
            {user.nickname}
          </Text>
          <Text ml={2}>{user.fullName}</Text>
        </Box>
        <TouchableOpacity
          onPress={() => (isChecked ? remove(user._id) : add(user._id))}
        >
          <Box
            flex
            center
            height={3}
            width={3}
            borderRadius={3}
            bgColor={isChecked ? 'primary' : undefined}
            borderColor="primary"
          >
            <Icon name="check" color="background" />
          </Box>
        </TouchableOpacity>
      </Box>
    </View>
  );
};

type Props = {
  partyId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const PartyInvite: React.FC<Props> = ({ partyId, isOpen, onClose }) => {
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
        Toast.show({ type: 'success', text1: 'Invitacionse enviadas!' });
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Ocurrio un error' });
    }
  };

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <Box flex row mb={2} style={{ alignItems: 'baseline' }}>
        <Text type="h2" flexGrow={1}>
          Invitar
        </Text>
        <Text type="secondary">Solo seguidores</Text>
      </Box>
      <TextInput
        placeholder="Buscar..."
        value={search}
        onChangeText={(text) => setSearch(text)}
        mb={4}
      />
      <StateHandler isLoading={isLoading} isError={Boolean(error)}>
        <FlatList
          style={{ height: 200 }}
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
      </StateHandler>
      <Button
        mt={4}
        isLoading={isSendInviteLoading}
        onPress={handleSubmit}
        isDisabled={Object.keys(selectedUsersId).length === 0}
      >
        Enviar invitaciones
      </Button>
    </BottomModal>
  );
};
