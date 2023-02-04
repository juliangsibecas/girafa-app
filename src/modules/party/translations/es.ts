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
      partyName: 'Nombre de la fiesta',
      addressExample: 'Ej: 1 Entre 55 y 57 N1100',
      allowInvitesHelper: 'Mis invitados pueden invitar',
      validating: 'Estamos validando los datos de tu fiesta.',
      success: {
        title: 'Vamos a estar validado los datos de la fiesta.',
        description: 'Mientras tanto no la vas a ver en la plataforma.',
      },
    },
    Detail: {
      share:
        'Mirá esta fiesta en Girafa 🤘 https://girafa.com.ar/app/party/{{slug}}',
    },
    Invite: {
      invite: 'Invitar',
      onlyFollowersAllowed: 'Solo podes invitar seguidores',
      emptyText: 'No se encontraron seguidores',
      sendInvitations: 'Enviar invitaciones',
    },
  },
} as const;
