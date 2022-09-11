export const partyTranslationES = {
  availability: 'Tipo',
  organizer: 'Organizador',
  address: 'Dirección',
  location: 'Ubicación',
  openBar: 'Barra Libre',
  description: 'Descripción',
  availabilities: {
    PUBLIC: 'Pública',
    FOLLOWERS: 'Solo seguidores',
    FOLLOWING: 'Solo seguidos',
    PRIVATE: 'Privada',
  },

  attend: 'Asistir',
  attending: 'Asistiendo',
  willAttend: 'Asistirán',
  attended: 'Asististe',
  notAttended: 'No asististe',

  screens: {
    CreateMap: {
      title: 'Elegí la ubicación',
      hint: 'Solo dentro de Gran La Plata',
    },
  },
  components: {
    Carousel: {
      slideToSee: 'Deslizá para ver fiestas',
      notAvailable: 'No hay fiestas disponibles',
    },
    Create: {
      CautionModal: {
        title: 'Titulo',
        body: 'Mensaje',
      },
      addressExample: 'Ej: 17 E/ 503 y 504 N2906',
      allowInvitesHelper: 'Mis invitados pueden invitar',
    },
    Invite: {
      invite: 'Invitar',
      onlyFollowersAllowed: 'Solo podes invitar seguidores',
      emptyText: 'No se encontraron seguidores',
      sendInvitations: 'Enviar invitaciones',
    },
  },
} as const;
