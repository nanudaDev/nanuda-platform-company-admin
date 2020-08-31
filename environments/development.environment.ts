import packageInfo from '../package.json';
import { Environment, EnvironmentType } from './environment.type';

export const DevelopmentEnvironment: Environment = {
  baseURL: 'http://localhost:4200/',
  NODE_ENV: EnvironmentType.development,
  production: false,
  clientName: packageInfo.name,
  productionTip: false,
  s3BaseUrl: 'https://kr.object.ncloudstorage.com/staging-storage-nanuda',
};
