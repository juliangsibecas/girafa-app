import { isIOS } from './platform';

const devServerUrl = isIOS ? 'http://localhost' : '10.0.2.2';
export const devApiUrl = `${devServerUrl}:4000`;
export const devAssetsUrl = `${devServerUrl}:4569/girafa-assets`;
