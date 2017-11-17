import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setCurrentUrl } from '../TopBar/actions'
import makeSelectApp from '../App/selector'
import VenuesComp from '../../components/Venues'

import {
  clearState,
  getUserLocation,
  getVenues,
  setCenterLocation,
  setShowSearchHere,
  setShowUserMarker,
  setUserLocation
} from './actions'
import makeSelectVenues from './selector'

const mapStateToProps = createStructuredSelector({
  loadingMap: makeSelectVenues('loadingMap'),
  userLocation: makeSelectVenues('userLocation'),
  centerLocation: makeSelectVenues('centerLocation'),
  showSearchHere: makeSelectVenues('showSearchHere'),
  sendingRequest: makeSelectApp('sendingRequest'),
  visibleVenues: makeSelectVenues('visibleVenues'),
  showUserMarker: makeSelectVenues('showUserMarker')
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
  loadCenterVenues: location => {
    dispatch(setUserLocation({ lat: 0, lng: 0 }))
    dispatch(setShowUserMarker(false))
    dispatch(setCenterLocation(location))
    dispatch(getVenues())
  },
  getUserLocation: () => {
    dispatch(getUserLocation())
  }
})

const VenuesPage = connect(mapStateToProps, mapDispatchToProps)(VenuesComp)

export default VenuesPage
