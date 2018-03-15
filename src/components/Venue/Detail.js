import { bool, func, object, string } from 'prop-types'
import React from 'react'

import { getGeneralType, getReviewsRatioWeight } from '../../utilities'

import AddReviewButton from './AddReviewButton'
import Container from './Container'
import Header from './Header'
import Info from './Info'
import Map from './Map'
import Photos from './Photos'
import Review from './Review'
import ReviewInfo from './ReviewInfo'

const Detail = props => {
  if (!props.venue.placeId) return <Container />

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

  if (props.createReviewVisible)
    return (
      <Review
        isAuthenticated={props.isAuthenticated}
        reviewsRatioWeight={reviewsRatioWeight}
        generalType={generalType}
        coverPhoto={props.venue.coverPhoto}
        name={props.venue.name}
        sendingRequest={props.sendingRequest}
        photo={props.photo}
        goToSignIn={props.goToSignIn}
        setNotificationMessage={props.setNotificationMessage}
        createPhoto={props.createPhoto}
        deletePhoto={props.deletePhoto}
        hideCreateReview={props.hideCreateReview}
        createReview={props.createReview}
      />
    )

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
      <ReviewInfo
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
      <AddReviewButton onClickHandler={props.showCreateReview} />
    </Container>
  )
}

Detail.propTypes = {
  venue: object.isRequired,
  photo: string.isRequired,
  createReviewVisible: bool.isRequired,
  isAuthenticated: bool.isRequired,
  sendingRequest: bool.isRequired,
  goToSignIn: func.isRequired,
  setNotificationMessage: func.isRequired,
  createPhoto: func.isRequired,
  deletePhoto: func.isRequired,
  showCreateReview: func.isRequired,
  hideCreateReview: func.isRequired,
  createReview: func.isRequired
}

export default Detail
