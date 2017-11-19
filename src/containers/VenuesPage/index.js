import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setVisibility as setNotificationVisibility } from '../Notification/actions'
import { setCurrentUrl } from '../TopBar/actions'
import makeSelectApp from '../App/selector'
import VenuesComp from '../../components/Venues'

import {
  clearState,
  getUserLocation,
  getVenues,
  setCenterLocation,
  setInfoboxLocation,
  setInfoboxVisibility,
  setShowSearchHere,
  setShowUserMarker,
  setUserLocation
} from './actions'
import makeSelectVenues from './selector'

const mapStateToProps = createStructuredSelector({
  notificationMessage: makeSelectVenues('notificationMessage'),
  loadingMap: makeSelectVenues('loadingMap'),
  userLocation: makeSelectVenues('userLocation'),
  centerLocation: makeSelectVenues('centerLocation'),
  showSearchHere: makeSelectVenues('showSearchHere'),
  sendingRequest: makeSelectApp('sendingRequest'),
  visibleVenues: makeSelectVenues('visibleVenues'),
  showUserMarker: makeSelectVenues('showUserMarker'),
  infoboxVisibility: makeSelectVenues('infoboxVisibility'),
  infoboxLocation: makeSelectVenues('infoboxLocation')
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
  onDragMap: () => {
    dispatch(setNotificationVisibility(false))
    dispatch(setInfoboxVisibility(false))
    dispatch(setShowSearchHere(true))
  },
  onZoomMap: () => {
    dispatch(dispatch(setInfoboxVisibility(false)))
  },
  loadCenterVenues: location => {
    dispatch(setUserLocation({ lat: 0, lng: 0 }))
    dispatch(setShowUserMarker(false))
    dispatch(setCenterLocation(location))
    dispatch(getVenues())
  },
  getUserLocation: () => {
    dispatch(getUserLocation())
  },
  showInfobox: location => {
    dispatch(setShowSearchHere(false))
    dispatch(setInfoboxLocation(location))
    dispatch(setInfoboxVisibility(true))
  },
  hideInfobox: () => {
    dispatch(setShowSearchHere(false))
    dispatch(setInfoboxVisibility(false))
  }
})

const VenuesPage = connect(mapStateToProps, mapDispatchToProps)(VenuesComp)

export default VenuesPage
