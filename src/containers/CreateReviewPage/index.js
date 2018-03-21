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
  getVenue
} from './actions'
import createReviewSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  sendingRequest: appSelector('sendingRequest'),
  loadingVenue: createReviewSelector('loadingVenue'),
  venue: createReviewSelector('venue'),
  photo: createReviewSelector('photo')
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
  createPhoto: data => {
    dispatch(createPhoto(data))
  },
  deletePhoto: () => {
    dispatch(deletePhoto())
  },
  createReview: data => {
    dispatch(createReview(data, ownProps.history.push))
  }
})

const CreateReview = connect(mapStateToProps, mapDispatchToProps)(
  CreateReviewComp
)

export default CreateReview
