import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './translations/en.json'
import hu from './translations/hu.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      hu: { translation: hu },
    },
    interpolation: {
      escapeValue: false,
    },
  })

export { i18n as i18nInstance }
