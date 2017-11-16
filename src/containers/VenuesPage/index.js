import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setCurrentUrl } from '../TopBar/actions'
import makeSelectApp from '../App/selector'
import VenuesComp from '../../components/Venues'

import {
  clearState,
  getVenues,
  setLocation,
  setShowSearchHere
} from './actions'
import makeSelectVenues from './selector'

const mapStateToProps = createStructuredSelector({
  loadingMap: makeSelectVenues('loadingMap'),
  showSearchHere: makeSelectVenues('showSearchHere'),
  sendingRequest: makeSelectApp('sendingRequest'),
  location: makeSelectVenues('location'),
  visibleVenues: makeSelectVenues('visibleVenues')
})

const mapDispatchToProps = dispatch => ({
  setVenuesUrl: () => {
    dispatch(setCurrentUrl('/'))
  },
  getVenues: () => {
    dispatch(getVenues())
  },
  clearState: () => {
    dispatch(clearState())
  },
  setShowSearchHere: showSearchHere => () => {
    dispatch(setShowSearchHere(showSearchHere))
  },
  loadNearbyVenues: location => {
    dispatch(setLocation(location))
    dispatch(setShowSearchHere(false))
  }
})

const VenuesPage = connect(mapStateToProps, mapDispatchToProps)(VenuesComp)

export default VenuesPage
