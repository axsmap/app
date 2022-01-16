import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import appSelector from '../App/selector'
import VenueComp from '../../components/Venue'

import {
  clearState,
  getVenue,
  setWelcomeVisibility,
  setUsesVisibility
} from './actions'
import venueSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  sendingRequest: appSelector('sendingRequest'),
  loadingVenue: venueSelector('loadingVenue'),
  venue: venueSelector('venue'),
  welcomeVisibility: venueSelector('welcomeVisibility'),
  usesVisibility: venueSelector('usesVisibility')
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
    dispatch(setUsesVisibility(false))
  },
  showUses: () => {
    dispatch(setUsesVisibility(true))
  },
  hideUses: () => {
    dispatch(setUsesVisibility(false))
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
