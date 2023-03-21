import {
  PartyGetDocument,
  PartyGetResponse,
  PartyPreview,
  UserGetAttendedPartiesByIdDocument,
  UserGetDocument,
  UserGetResponse,
} from '../../api';
import { client } from '../../apollo';

export const cacheUpdatePartyAttend = ({
  user,
  party,
}: {
  user: UserGetResponse;
  party: PartyGetResponse;
}) => {
  const isAttending = !party.isAttender;

  client.writeQuery({
    query: PartyGetDocument,
    data: {
      partyGet: {
        ...party,
        attenders: isAttending
          ? [user, ...party.attenders]
          : party.attenders.filter(({ _id }) => _id !== user._id),
        attendersCount: isAttending
          ? party.attendersCount + 1
          : party.attendersCount - 1,
        isAttender: isAttending,
      } as Partial<PartyGetResponse>,
    },
    variables: {
      data: {
        id: party._id,
      },
    },
  });

  client.writeQuery({
    query: UserGetDocument,
    data: {
      userGet: {
        ...user,
        attendedPartiesCount: isAttending
          ? user.attendedPartiesCount + 1
          : user.attendedPartiesCount - 1,
      } as Partial<UserGetResponse>,
    },
    variables: {
      data: {
        id: user._id,
      },
    },
  });

  client.cache.evict({
    fieldName: 'partySearchAttenders',
    broadcast: true,
  });

  const userPartiesData = client.readQuery({
    query: UserGetAttendedPartiesByIdDocument,
    variables: { id: user._id },
  });

  if (userPartiesData) {
    const userParties =
      userPartiesData.userGetAttendedPartiesById as Array<PartyPreview>;

    client.writeQuery({
      query: UserGetAttendedPartiesByIdDocument,
      data: {
        userGetAttendedPartiesById: isAttending
          ? [
              ...userParties,
              { ...party, organizerNickname: party.organizer?.nickname },
            ]
          : userParties.filter(({ _id }) => _id !== party._id),
      },
      variables: {
        id: user._id,
      },
    });
  }
};
