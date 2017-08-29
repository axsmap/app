import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import esLocaleData from 'react-intl/locale-data/es'

import { DEFAULT_LOCALE } from './containers/LanguageProvider/constants'

import enTranslationMessages from './translations/en.json'
import esTranslationMessages from './translations/es.json'

addLocaleData([...enLocaleData, ...esLocaleData])

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

export const appLocales = ['en', 'es']

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages)
}
