import { createSelector } from 'reselect'

const selectLanguage = state => state.language

export default function makeSelectLocale(attribute) {
  return createSelector(
    selectLanguage,
    languageState => languageState[attribute]
  )
}
