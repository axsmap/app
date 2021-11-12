import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import appSelector from '../App/selector'
import VenueComp from '../../components/Venue'

import { clearState, getVenue, setWelcomeVisibility } from './actions'
import venueSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  sendingRequest: appSelector('sendingRequest'),
  loadingVenue: venueSelector('loadingVenue'),
  venue: venueSelector('venue'),
  welcomeVisibility: venueSelector('welcomeVisibility')
})

const mapDispatchToProps = dispatch => ({
  getVenue: placeId => {
    dispatch(getVenue(placeId))
  },
  showWelcome: () => {
    dispatch(setWelcomeVisibility(true))
  },
  hideWelcome: () => {
    dispatch(setWelcomeVisibility(false))
  },
  clearState: () => {
    dispatch(clearState())
  }
})

const Venue = connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueComp)

export default Venue
