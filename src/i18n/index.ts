import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { es } from './es';

export default i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',

  lng: 'es',
  fallbackLng: 'es',

  ns: ['translation'],
  defaultNS: 'translation',

  interpolation: {
    escapeValue: false,
  },

  resources: { es },
});
