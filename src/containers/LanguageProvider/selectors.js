import { createSelector } from 'reselect'

const selectLanguage = state => state.language

export const makeSelectLocale = () =>
  createSelector(selectLanguage, languageState => languageState.locale)
