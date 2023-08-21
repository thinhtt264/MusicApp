import { ThemeType } from 'src/themes';
import { ENVFields } from 'src/common/config/env';
import { AlertProps } from 'src/components/arlert/type';

export interface AppState {
  loadingApp: boolean;
  handleAlert: AlertProps;
  showToastMessage: boolean;
  firstTimeLauch: boolean;
  theme: ThemeType;
  env: ENVFields | null;
  language: 'vi' | 'en';
}
