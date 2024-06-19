import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage
} from '../Notification/actions'
import CreateReviewComp from '../../components/CreateReview'
import appSelector from '../App/selector'

import {
  clearState,
  createPhoto,
  createReview,
  deletePhoto,
  getVenue,
  setErrors,
  setHowToRateVisibility
} from './actions'
import createReviewSelector from './selector'

const mapStateToProps = createStructuredSelector({
  loadingVenue: createReviewSelector('loadingVenue'),
  venue: createReviewSelector('venue'),
  errors: createReviewSelector('errors'),
  userData: appSelector('userData'),
  photo: createReviewSelector('photo'),
  sendingRequest: appSelector('sendingRequest'),
  howToRateVisibility: createReviewSelector('howToRateVisibility'),
  reviewThankYouVisibility: createReviewSelector('reviewThankYouVisibility')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getVenue: placeId => {
    dispatch(getVenue(placeId))
  },
  clearState: () => {
    dispatch(clearState())
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
    if (notificationMessage) dispatch(setNotificationIsVisible(true))
    else dispatch(setNotificationIsVisible(false))
  },
  clearError: key => {
    dispatch(setErrors(key, ''))
  },
  createPhoto: data => {
    dispatch(createPhoto(data))
  },
  deletePhoto: () => {
    dispatch(deletePhoto())
  },
  createReview: data => {
    dispatch(createReview(data, ownProps.history.push))
  },
  showHowToRate: () => {
    dispatch(setHowToRateVisibility(true))
  },
  hideHowToRate: () => {
    dispatch(setHowToRateVisibility(false))
  }
})

const CreateReview = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateReviewComp)

export default CreateReview
