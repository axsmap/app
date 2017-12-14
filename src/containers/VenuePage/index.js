import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setCurrentUrl } from '../TopBar/actions'
import makeSelectApp from '../App/selector'
import VenueComp from '../../components/Venue'

import { clearState, getVenue, setShowCreateReview } from './actions'
import makeSelectVenue from './selector'

const mapStateToProps = createStructuredSelector({
  sendingRequest: makeSelectApp('sendingRequest'),
  showCreateReview: makeSelectVenue('showCreateReview'),
  venue: makeSelectVenue('venue'),
  notificationMessage: makeSelectVenue('notificationMessage')
})

const mapDispatchToProps = dispatch => ({
  clearCurrentUrl: () => {
    dispatch(setCurrentUrl(''))
  },
  getVenue: placeId => {
    dispatch(getVenue(placeId))
  },
  setShowCreateReview: showCreateReview => {
    dispatch(setShowCreateReview(showCreateReview))
  },
  clearState: () => {
    dispatch(clearState())
  }
})

const Venue = connect(mapStateToProps, mapDispatchToProps)(VenueComp)

export default Venue
