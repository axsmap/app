import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setCurrentUrl } from '../TopBar/actions'
import makeSelectApp from '../App/selector'
import VenueComp from '../../components/Venue'

import makeSelectVenue from './selector'
import { getVenue } from './actions'

const mapStateToProps = createStructuredSelector({
  sendingRequest: makeSelectApp('sendingRequest'),
  venue: makeSelectVenue('venue'),
  notificationMessage: makeSelectVenue('notificationMessage')
})

const mapDispatchToProps = dispatch => ({
  clearCurrentUrl: () => {
    dispatch(setCurrentUrl(''))
  },
  getVenue: placeId => {
    dispatch(getVenue(placeId))
  }
})

const Venue = connect(mapStateToProps, mapDispatchToProps)(VenueComp)

export default Venue
