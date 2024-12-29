import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import esLocaleData from 'react-intl/locale-data/es'
import jaLocaleData from 'react-intl/locale-data/ja'
import frLocaleData from 'react-intl/locale-data/fr'

import { DEFAULT_LOCALE } from './containers/LanguageProvider/constants'

import enTranslationMessages from './translations/en.json'
import esTranslationMessages from './translations/es.json'
import jaTranslationMessages from './translations/ja.json'
import frTranslationMessages from './translations/fr.json'

addLocaleData([
  ...enLocaleData,
  ...esLocaleData,
  ...jaLocaleData,
  ...frLocaleData
])

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}

export const appLocales = ['en', 'es', 'ja', 'fr']

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages),
  ja: formatTranslationMessages('ja', jaTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages)
}
