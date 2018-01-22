import { createSelector } from 'reselect'

const selectPetitions = state => state.petitions

export default function makeSelectPetitions(attribute) {
  return createSelector(
    selectPetitions,
    petitionsState => petitionsState[attribute]
  )
}
