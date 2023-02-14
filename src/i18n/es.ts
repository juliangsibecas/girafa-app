import { authTranslationES } from '../modules/auth';
import { chatTranslationES } from '../modules/chat';
import { discoverTranslationES } from '../modules/discover';
import { legalTranslationES } from '../modules/legal';
import { maintenanceTranslationES } from '../modules/maintenance';
import { notificationTranslationES } from '../modules/notification';
import { onboardingTranslationES } from '../modules/onboarding';
import { partyTranslationES } from '../modules/party';
import { settingsTranslationES } from '../modules/settings';
import { supportTranslationES } from '../modules/support';
import { userTranslationES } from '../modules/user';

export const es = {
  translation: {
    general: {
      users: 'Usuarios',
      parties: 'Fiestas',
      notifications: 'Notificaciones',

      name: 'Nombre',
      date: 'Fecha',
      photo: 'Foto',

      yes: 'Si',
      no: 'No',

      discover: 'Descubrir',
      searchEllipsis: 'Buscar...',
      continue: 'Continuar',
      goBack: 'Volver',
      edit: 'Editar',
      save: 'Guardar',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      delete: 'Eliminar',

      seeAll: 'Ver todos',
      seeMore: 'Ver más',
      seeLess: 'Ver menos',

      error: 'Ocurrio un error inesperado',

      signOut: 'Cerrar sesión',

      publics: 'Públicas',
    },
    api: {
      featureToggleDisabled: 'Funcionalidad no disponible en este momento.',
      error: 'Hubo un error al realizar la acción.',
      success: 'La acción se realizó correctamente.',
      responses: {
        EMAIL_NOT_AVAILABLE: 'Correo electrónico en uso',
        EMAIL_NOT_FOUND: 'Correo electrónico no encontrado',
        PARTY_NAME_NOT_AVAILABLE: 'Nombre en uso',
        PASSWORD_INVALID: 'Contraseña inválida',
        SIGN_IN_INVALID: 'Nombre de usuario o contraseña inválidos',
        USER_NAME_NOT_AVAILABLE: 'Nombre de usuario en uso',
      },
    },
    onboarding: onboardingTranslationES,
    auth: authTranslationES,
    party: partyTranslationES,
    user: userTranslationES,
    notification: notificationTranslationES,
    discover: discoverTranslationES,
    support: supportTranslationES,
    settings: settingsTranslationES,
    legal: legalTranslationES,
    maintenance: maintenanceTranslationES,
    chat: chatTranslationES,
  },
} as const;
