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

  attend: 'Voy',
  attending: 'Yendo',
  willAttend: 'Asistirán',
  attended: 'Asististe',
  notAttended: 'No asististe',

  screens: {
    CreateMap: {
      title: 'Elegí la ubicación',
      hint: 'Solo aceptamos fiestas dentro del Gran La Plata',
    },
  },
  components: {
    Carousel: {
      slideToSee: 'Deslizá para encontrar fiestas',
      notAvailable: 'No hay fiestas disponibles',
    },
    Create: {
      CautionModal: {
        title: 'Atención',
        body: 'Al crear la fiesta validaremos que los datos sean correctos. Mientras tanto no la vas a ver en la plataforma.',
      },
      addressExample: 'Ej: 17 E/ 503 y 504 N2906',
      allowInvitesHelper: 'Mis invitados pueden invitar',
      success: {
        title: 'Vamos a estar validado los datos de la fiesta.',
        description: 'Mientras tanto no la vas a ver en la plataforma.',
      },
    },
    Invite: {
      invite: 'Invitar',
      onlyFollowersAllowed: 'Solo podes invitar seguidores',
      emptyText: 'No se encontraron seguidores',
      sendInvitations: 'Enviar invitaciones',
    },
  },
} as const;
