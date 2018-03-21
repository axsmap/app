import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import appSelector from '../App/selector'
import VenueComp from '../../components/Venue'

import { clearState, getVenue } from './actions'
import venueSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  sendingRequest: appSelector('sendingRequest'),
  loadingVenue: venueSelector('loadingVenue'),
  venue: venueSelector('venue')
})

const mapDispatchToProps = dispatch => ({
  getVenue: placeId => {
    dispatch(getVenue(placeId))
  },
  clearState: () => {
    dispatch(clearState())
  }
})

const Venue = connect(mapStateToProps, mapDispatchToProps)(VenueComp)

export default Venue
