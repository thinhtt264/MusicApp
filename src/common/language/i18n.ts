import i18next, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './locales';

import { getState } from 'src/common/redux';

const { language } = getState('app');

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback: any) => {
    callback(language);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};
/**
 * Config i18n for app
 */
i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'vi',
    resources: resources,
    lng: 'vi',
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: false,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18next;
