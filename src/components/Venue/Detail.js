import { bool, func, object } from 'prop-types'
import React from 'react'

import { getGeneralType, getReviewsRatioWeight } from '../../utilities'

import AddReviewButton from './AddReviewButton'
import Container from './Container'
import Header from './Header'
import Info from './Info'
import Map from './Map'
import Photos from './Photos'
import Reviews from './Reviews'

const Detail = props => {
  if (!props.venue.placeId) return <Container />

  if (props.showCreateReview) return <Container />

  const reviewData = {
    allowsGuideDog: props.venue.allowsGuideDog,
    bathroomScore: props.venue.bathroomScore,
    entryScore: props.venue.entryScore,
    hasParking: props.venue.hasParking,
    hasSecondEntry: props.venue.hasSecondEntry,
    hasWellLit: props.venue.hasWellLit,
    isQuiet: props.venue.isQuiet,
    isSpacious: props.venue.isSpacious,
    steps: props.venue.steps
  }

  const reviewsRatioWeight = getReviewsRatioWeight(reviewData)
  const generalType = getGeneralType(props.venue.types)

  return (
    <Container>
      <Header
        reviewsRatioWeight={reviewsRatioWeight}
        generalType={generalType}
        coverPhoto={props.venue.coverPhoto}
        name={props.venue.name}
      />
      <Info
        address={props.venue.address}
        formattedPhone={props.venue.formattedPhone}
        internationalPhone={props.venue.internationalPhone}
        website={props.venue.website}
      />
      <Map
        reviewsRatioWeight={reviewsRatioWeight}
        generalType={generalType}
        location={props.venue.location}
      />
      <Photos photos={props.venue.photos} />
      <Reviews
        entryScore={props.venue.entryScore}
        entryReviews={props.venue.entryReviews}
        bathroomScore={props.venue.bathroomScore}
        bathroomReviews={props.venue.bathroomReviews}
        steps={props.venue.steps}
        allowsGuideDog={props.venue.allowsGuideDog}
        hasParking={props.venue.hasParking}
        hasSecondEntry={props.venue.hasSecondEntry}
        hasWellLit={props.venue.hasWellLit}
        isQuiet={props.venue.isQuiet}
        isSpacious={props.venue.isSpacious}
      />
      <AddReviewButton onClickHandler={() => props.setShowCreateReview(true)} />
    </Container>
  )
}

Detail.propTypes = {
  showCreateReview: bool.isRequired,
  venue: object.isRequired,
  setShowCreateReview: func.isRequired
}

export default Detail
