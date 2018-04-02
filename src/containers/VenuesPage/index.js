import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setIsVisible as setNotificationVisibility } from '../Notification/actions'
import makeSelectApp from '../App/selector'
import VenuesComp from '../../components/Venues'

import {
  clearFilters,
  clearState,
  getUserLocation,
  getVenues,
  setCenterLocation,
  setFilters,
  setListVisibility,
  setLoadingVenues,
  setMapVisibility,
  setNextPage,
  setPopupVisibility,
  setShowSearchHere,
  setShowUserMarker,
  setUserLocation,
  setVenues,
  setVisibleVenues
} from './actions'
import makeSelectVenues from './selector'

const mapStateToProps = createStructuredSelector({
  filters: makeSelectVenues('filters'),
  listVisibility: makeSelectVenues('listVisibility'),
  loadingVenues: makeSelectVenues('loadingVenues'),
  incomingVenues: makeSelectVenues('incomingVenues'),
  loadingMap: makeSelectVenues('loadingMap'),
  mapVisibility: makeSelectVenues('mapVisibility'),
  userLocation: makeSelectVenues('userLocation'),
  centerLocation: makeSelectVenues('centerLocation'),
  showSearchHere: makeSelectVenues('showSearchHere'),
  sendingRequest: makeSelectApp('sendingRequest'),
  visibleVenues: makeSelectVenues('visibleVenues'),
  showUserMarker: makeSelectVenues('showUserMarker'),
  popupVisibility: makeSelectVenues('popupVisibility')
})

const mapDispatchToProps = dispatch => ({
  getVenues: () => {
    dispatch(getVenues())
  },
  clearState: () => {
    dispatch(clearState())
  },
  hideFilters: () => {
    dispatch(setFilters('visible', false))
  },
  clearFilters: () => {
    dispatch(clearFilters())
    dispatch(setLoadingVenues(true))
    dispatch(setVenues([]))
    dispatch(setVisibleVenues([]))
    dispatch(setNextPage(''))
    dispatch(getVenues())
  },
  applyFilters: filters => {
    dispatch(setFilters('visible', false))
    dispatch(setFilters('type', filters.type))
    dispatch(setFilters('entryScore', filters.entryScore))
    dispatch(setFilters('bathroomScore', filters.bathroomScore))
    dispatch(setFilters('allowsGuideDog', filters.allowsGuideDog))
    dispatch(setFilters('hasParking', filters.hasParking))
    dispatch(setFilters('hasSecondEntry', filters.hasSecondEntry))
    dispatch(setFilters('hasWellLit', filters.hasWellLit))
    dispatch(setFilters('isQuiet', filters.isQuiet))
    dispatch(setFilters('isSpacious', filters.isSpacious))
    dispatch(setFilters('steps', filters.steps))
    dispatch(setLoadingVenues(true))
    dispatch(setVenues([]))
    dispatch(setVisibleVenues([]))
    dispatch(setNextPage(''))
    dispatch(getVenues(filters))
  },
  setCenterLocation: location => () => {
    dispatch(setCenterLocation(location))
  },
  showFilters: () => {
    dispatch(setFilters('visible', true))
  },
  showMap: () => {
    dispatch(setListVisibility(false))
    dispatch(setMapVisibility(true))
  },
  onClickMap: () => {
    dispatch(setPopupVisibility(false))
  },
  onDragMap: () => {
    dispatch(setNotificationVisibility(false))
    dispatch(setPopupVisibility(false))
    dispatch(setShowSearchHere(true))
  },
  onZoomMap: () => {
    dispatch(setPopupVisibility(false))
  },
  loadCenterVenues: location => {
    dispatch(setLoadingVenues(true))
    dispatch(setVenues([]))
    dispatch(setVisibleVenues([]))
    dispatch(setNextPage(''))
    dispatch(setUserLocation({ lat: 0, lng: 0 }))
    dispatch(setShowUserMarker(false))
    dispatch(setCenterLocation(location))
    dispatch(getVenues())
  },
  getUserLocation: () => {
    dispatch(setLoadingVenues(true))
    dispatch(setVenues([]))
    dispatch(setVisibleVenues([]))
    dispatch(setNextPage(''))
    dispatch(setPopupVisibility(false))
    dispatch(getUserLocation())
  },
  showPopup: () => {
    dispatch(setShowSearchHere(false))
    dispatch(setPopupVisibility(true))
  },
  hidePopup: () => {
    dispatch(setPopupVisibility(false))
  },
  showList: () => {
    dispatch(setMapVisibility(false))
    dispatch(setListVisibility(true))
  }
})

const VenuesPage = connect(mapStateToProps, mapDispatchToProps)(VenuesComp)

export default VenuesPage
