import { forOwn } from 'lodash'
import { venuesCategories } from './constants'

export function getReviewsRatioWeight(reviewData) {
  let reviewsTotalWeight = 0
  let reviewsActualWeight = 0

  if (reviewData.entryScore) {
    reviewsTotalWeight += 3

    const entryScore = reviewData.entryScore
    if (entryScore >= 1 && entryScore < 3) reviewsActualWeight += 1
    else if (entryScore >= 3 && entryScore < 4) reviewsActualWeight += 2
    else if (entryScore >= 4 && entryScore <= 5) reviewsActualWeight += 3
  }
  if (
    reviewData.steps.zero > 0 ||
    reviewData.steps.one > 0 ||
    reviewData.steps.two > 0 ||
    reviewData.steps.moreThanTwo > 0
  ) {
    reviewsTotalWeight += 2

    const maxSteps = { value: 0, key: '' }
    forOwn(reviewData.steps, (value, key) => {
      if (value > maxSteps.value) {
        maxSteps.value = value
        maxSteps.key = key
      }
    })

    if (maxSteps.key === 'zero') reviewsActualWeight += 2
    else if (maxSteps.key === 'one') reviewsActualWeight += 1
    else if (maxSteps.key === 'two') reviewsActualWeight += 0.5
  }
  if (reviewData.bathroomScore) {
    reviewsTotalWeight += 3

    const bathroomScore = reviewData.bathroomScore
    if (bathroomScore >= 1 && bathroomScore < 3) reviewsActualWeight += 1
    else if (bathroomScore >= 3 && bathroomScore < 4) reviewsActualWeight += 2
    else if (bathroomScore >= 4 && bathroomScore <= 5) reviewsActualWeight += 3
  }
  if (reviewData.allowsGuideDog.yes || reviewData.allowsGuideDog.no) {
    reviewsTotalWeight += 0.5

    const allowsGuideDog = reviewData.allowsGuideDog
    if (allowsGuideDog.yes && allowsGuideDog.yes > allowsGuideDog.no)
      reviewsActualWeight += 0.5
    else if (
      allowsGuideDog.yes &&
      allowsGuideDog.no &&
      allowsGuideDog.yes === allowsGuideDog.no
    )
      reviewsActualWeight += 0.25
  }
  if (reviewData.hasParking.yes || reviewData.hasParking.no) {
    reviewsTotalWeight += 0.5

    const hasParking = reviewData.hasParking
    if (hasParking.yes && hasParking.yes > hasParking.no)
      reviewsActualWeight += 0.5
    else if (
      hasParking.yes &&
      hasParking.no &&
      hasParking.yes === hasParking.no
    )
      reviewsActualWeight += 0.25
  }
  if (reviewData.hasSecondEntry.yes || reviewData.hasSecondEntry.no) {
    reviewsTotalWeight += 0.5

    const hasSecondEntry = reviewData.hasSecondEntry
    if (hasSecondEntry.yes && hasSecondEntry.yes > hasSecondEntry.no)
      reviewsActualWeight += 0.5
    else if (
      hasSecondEntry.yes &&
      hasSecondEntry.no &&
      hasSecondEntry.yes === hasSecondEntry.no
    )
      reviewsActualWeight += 0.25
  }
  if (reviewData.hasWellLit.yes || reviewData.hasWellLit.no) {
    reviewsTotalWeight += 0.5

    const hasWellLit = reviewData.hasWellLit
    if (hasWellLit.yes && hasWellLit.yes > hasWellLit.no)
      reviewsActualWeight += 0.5
    else if (
      hasWellLit.yes &&
      hasWellLit.no &&
      hasWellLit.yes === hasWellLit.no
    )
      reviewsActualWeight += 0.25
  }
  if (reviewData.isQuiet.yes || reviewData.isQuiet.no) {
    reviewsTotalWeight += 0.5

    const isQuiet = reviewData.isQuiet
    if (isQuiet.yes && isQuiet.yes > isQuiet.no) reviewsActualWeight += 0.5
    else if (isQuiet.yes && isQuiet.no && isQuiet.yes === isQuiet.no)
      reviewsActualWeight += 0.25
  }
  if (reviewData.isSpacious.yes || reviewData.isSpacious.no) {
    reviewsTotalWeight += 1

    const isSpacious = reviewData.isSpacious
    if (isSpacious.yes && isSpacious.yes > isSpacious.no)
      reviewsActualWeight += 1
    else if (
      isSpacious.yes &&
      isSpacious.no &&
      isSpacious.yes === isSpacious.no
    )
      reviewsActualWeight += 0.5
  }

  if (reviewsTotalWeight) return reviewsActualWeight / reviewsTotalWeight
  return 0
}

export function getGeneralType(venuesTypes) {
  let generalType = 'establishment'

  for (let i = 0; i < venuesTypes.length; i += 1) {
    for (let j = 0; j < venuesCategories.length; j += 1) {
      const venuesOptions = venuesCategories[j].options
      const type = venuesOptions.find(o => o === venuesTypes[i])
      if (type) {
        generalType = venuesCategories[j].value
        break
      }
    }

    if (generalType !== 'establishment') break
  }

  return generalType
}
