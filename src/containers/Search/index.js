import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectHome from '../HomePage/selector'
import SearchComponent from '../../components/Search'
import { setShowSearch } from '../HomePage/actions'

import {
  getLocation,
  getVenuesRequest,
  setInput,
  setLocation,
  setLocationError,
  setShowFilters,
  setVenueType,
  setVenues,
  toggleShowFilters
} from './actions'
import makeSelectSearch from './selector'

const mapStateToProps = createStructuredSelector({
  currentlySending: makeSelectSearch('currentlySending'),
  input: makeSelectSearch('input'),
  location: makeSelectSearch('location'),
  locationError: makeSelectSearch('locationError'),
  showFilters: makeSelectSearch('showFilters'),
  showSearch: makeSelectHome('showSearch'),
  venueType: makeSelectSearch('venueType'),
  venues: makeSelectSearch('venues')
})

const mapDispatchToProps = dispatch => ({
  changeInput: e => {
    dispatch(setInput(e.target.value))
    dispatch(getVenuesRequest())
  },
  changeVenueType: e => {
    dispatch(setVenueType(e.target.value))
    dispatch(setShowFilters(false))
    dispatch(getVenuesRequest())
  },
  getLocation: () => {
    dispatch(getLocation())
  },
  hideFilters: () => {
    dispatch(setShowFilters(false))
  },
  onFocusInput: () => {
    dispatch(setShowFilters(false))
    dispatch(setLocationError(''))
  },
  toggleShowFilters: () => {
    dispatch(toggleShowFilters())
    dispatch(setLocationError(''))
  },
  hideSearch: () => {
    dispatch(setShowSearch(false))
    dispatch(setInput(''))
    dispatch(setVenues([]))
    dispatch(setLocationError(''))
    dispatch(setLocation(''))
    dispatch(setShowFilters(false))
    dispatch(setVenueType('any'))
  }
})

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComponent)

export default Search
