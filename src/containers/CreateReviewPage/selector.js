import { createSelector } from 'reselect'

const selectCreateReview = state => state.createReview

export default function makeSelectCreateReview(attribute) {
  return createSelector(
    selectCreateReview,
    createReviewState => createReviewState[attribute]
  )
}
