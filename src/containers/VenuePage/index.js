import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage
} from '../Notification/actions'
import appSelector from '../App/selector'
import VenueComp from '../../components/Venue'

import {
  clearState,
  createPhoto,
  createReview,
  deletePhoto,
  getVenue,
  setCreateReviewIsVisible
} from './actions'
import venueSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  sendingRequest: appSelector('sendingRequest'),
  loadingVenue: venueSelector('loadingVenue'),
  venue: venueSelector('venue'),
  createReviewIsVisible: venueSelector('createReviewIsVisible'),
  photo: venueSelector('photo')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getVenue: placeId => {
    dispatch(getVenue(placeId))
  },
  showCreateReview: () => {
    dispatch(setCreateReviewIsVisible(true))
  },
  goToSignIn: () => {
    ownProps.history.push('/sign-in')
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
    if (notificationMessage) dispatch(setNotificationIsVisible(true))
    else dispatch(setNotificationIsVisible(false))
  },
  createPhoto: data => {
    dispatch(createPhoto(data))
  },
  deletePhoto: () => {
    dispatch(deletePhoto())
  },
  hideCreateReview: () => {
    dispatch(setCreateReviewIsVisible(false))
  },
  clearState: () => {
    dispatch(clearState())
  },
  createReview: data => {
    dispatch(createReview(data))
  }
})

const Venue = connect(mapStateToProps, mapDispatchToProps)(VenueComp)

export default Venue
