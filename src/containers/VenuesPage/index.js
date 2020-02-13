import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setIsVisible as setNotificationVisibility } from '../Notification/actions'
import { setKeywords, setAddress } from '../TopBar/actions'
import { setWelcomeAddress } from '../WelcomePage/actions'
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
  setVisibleVenues,
  setWelcomeVisibility,
  setUsesVisibility
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
  popupVisibility: makeSelectVenues('popupVisibility'),
  welcomeVisibility: makeSelectVenues('welcomeVisibility'),
  usesVisibility: makeSelectVenues('usesVisibility')
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
    dispatch(setFilters('entranceScore', filters.entranceScore))
    dispatch(setFilters('interiorScore', filters.interiorScore))
    dispatch(setFilters('restroomScore', filters.restroomScore))
    dispatch(setFilters('allowsGuideDog', filters.allowsGuideDog))
    dispatch(setFilters('hasParking', filters.hasParking))
    dispatch(setLoadingVenues(true))
    dispatch(setVenues([]))
    dispatch(setVisibleVenues([]))
    dispatch(setNextPage(''))
    dispatch(getVenues(filters))
  },
  setCenterLocation: location => () => {
    dispatch(setCenterLocation(location))
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
    dispatch(
      setUserLocation({
        lat: 0,
        lng: 0
      })
    )
    dispatch(setShowUserMarker(false))
    dispatch(setCenterLocation(location))
    dispatch(setKeywords(''))
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
    dispatch(setWelcomeVisibility(false))
    dispatch(setUsesVisibility(false))
  },
  showFilters: () => {
    dispatch(setFilters('visible', true))
  },
  showWelcome: () => {
    dispatch(setWelcomeVisibility(true))
  },
  hideWelcome: () => {
    dispatch(setWelcomeVisibility(false))
    dispatch(setUsesVisibility(false))
    dispatch(setWelcomeAddress(''))
  },
  showUses: () => {
    dispatch(setUsesVisibility(true))
  },
  hideUses: () => {
    dispatch(setUsesVisibility(false))
  },
  handleAddressChange: e => {
    dispatch(setAddress(e.target.value))
  },
  handleWelcomeAddressChange: e => {
    dispatch(setWelcomeAddress(e.target.value))
  },
  handleAddressReset: () => {
    dispatch(setAddress(''))
  }
})

const VenuesPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(VenuesComp)

export default VenuesPage
