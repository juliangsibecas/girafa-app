import moment from 'moment';
import { LocaleConfig } from 'react-native-calendars';

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const monthsShort = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul.',
  'Ago',
  'Sept',
  'Oct',
  'Nov',
  'Déc',
];

const days = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const daysShort = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'];

moment.locale('es', {
  months,
  monthsShort,
  weekdays: days,
  weekdaysShort: daysShort,
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
});

LocaleConfig.locales['es'] = {
  monthNames: months,
  monthNamesShort: monthsShort,
  dayNames: days,
  dayNamesShort: daysShort,
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';
