import { isIOS } from '../../utils';

export const getStoreUrl = () =>
  isIOS
    ? 'https://apps.apple.com/ar/app/girafa/id6444381288'
    : 'https://play.google.com/store/apps/details?id=ar.com.girafa.app';
