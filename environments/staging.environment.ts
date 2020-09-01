import packageInfo from '../package.json';
import { Environment, EnvironmentType } from './environment.type';

export const StagingEnvironment: Environment = {
  // baseURL: 'https://platform-api-test.nanudakitchen.com/',
  baseURL: 'http://211.249.62.165:4200/',
  NODE_ENV: EnvironmentType.staging,
  production: false,
  clientName: packageInfo.name,
  productionTip: false,
  s3BaseUrl: 'https://kr.object.ncloudstorage.com/staging-storage-nanuda',
};
