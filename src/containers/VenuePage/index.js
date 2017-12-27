import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setIsVisible as setNotificationIsVisible } from '../Notification/actions'
import { setCurrentUrl } from '../TopBar/actions'
import makeSelectApp from '../App/selector'
import VenueComp from '../../components/Venue'

import {
  clearState,
  createReview,
  getVenue,
  setCreateReviewVisible,
  setLoadingPhoto,
  setNotificationMessage
} from './actions'
import makeSelectVenue from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectApp('isAuthenticated'),
  sendingRequest: makeSelectApp('sendingRequest'),
  loadingVenue: makeSelectVenue('loadingVenue'),
  notificationMessage: makeSelectVenue('notificationMessage'),
  venue: makeSelectVenue('venue'),
  createReviewVisible: makeSelectVenue('createReviewVisible'),
  loadingPhoto: makeSelectVenue('loadingPhoto')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearCurrentUrl: () => {
    dispatch(setCurrentUrl(''))
  },
  getVenue: placeId => {
    dispatch(getVenue(placeId))
  },
  showCreateReview: () => {
    dispatch(setCreateReviewVisible(true))
  },
  goToSignIn: () => {
    ownProps.history.push('/sign-in')
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
    if (notificationMessage) dispatch(setNotificationIsVisible(true))
    else dispatch(setNotificationIsVisible(false))
  },
  setLoadingPhoto: loadingPhoto => {
    dispatch(setLoadingPhoto(loadingPhoto))
  },
  hideCreateReview: () => {
    dispatch(setCreateReviewVisible(false))
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
