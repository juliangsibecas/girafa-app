import 'react-i18next';
import { es } from '../i18n/es';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof es.translation;
    };
  }
}
