export const userTranslationES = {
  email: 'Correo electrónico',
  nickname: 'Nombre de usuario',
  password: 'Contraseña',
  confirmPassword: 'Confirmar contraseña',
  newPassword: 'Nueva contraseña',
  follow: 'Seguir',
  followBack: 'Seguir también',
  followers: 'Seguidores',
  following: 'Siguiendo',

  screens: {
    Edit: {
      title: 'Editar perfil',
      instagramUser: 'Usuario de Instagram',
      instagramUserExample: 'Ej: juliangsibecas',
    },
    Delete: {
      title: 'Eliminar cuenta',
      subtitle: 'Una vez eliminada tu cuenta ya no vas a poder recuperarla.',
    },
    PasswordChange: {
      title: 'Cambio de contraseña',
      currentPassword: 'Contraseña actual',
      newPassword: 'Nueva contraseña',
      changePassword: 'Cambiar contraseña',
      badCurrentPassword: 'La contraseña actual es incorrecta',
    },
    UserAttendedParties: {
      emptyText: 'No hay fiestas públicas para mostrar',
    },
  },
  components: {
    Profile: {
      share:
        'Mirá mi perfil en Girafa 🤘 https://girafa.com.ar/app/user/{{nickname}}',
      editProfile: 'Editar perfil',
    },
  },
} as const;
