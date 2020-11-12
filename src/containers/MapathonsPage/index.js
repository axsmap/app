import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Mapathons from '../../components/Mapathons'

import {
  clearState,
  getMapathons,
  clearFilters,
  setFilters,
  setPopupVisibility,
  setLoadingMapathons,
  setMapathons,
  setNextPage
} from './actions'
import makeSelectMapathons from './selector'

const mapStateToProps = createStructuredSelector({
  filters: makeSelectMapathons('filters'),
  popupVisibility: makeSelectMapathons('popupVisibility'),
  sendingRequest: makeSelectApp('sendingRequest'),
  loadingMapathons: makeSelectMapathons('loadingMapathons'),
  nextPage: makeSelectMapathons('nextPage'),
  mapathons: makeSelectMapathons('mapathons'),
  showFilters: makeSelectMapathons('showFilters')
})

const mapDispatchToProps = dispatch => ({
  getMapathons: () => {
    dispatch(getMapathons())
  },
  clearState: () => {
    dispatch(clearState())
  },
  hideFilters: () => {
    dispatch(setFilters('visible', false))
  },
  clearFilters: () => {
    dispatch(clearFilters())
    dispatch(setLoadingMapathons(true))
    dispatch(setMapathons([]))
    // dispatch(setVisibleVenues([]))
    // dispatch(setNextPage(''))
    dispatch(getMapathons())
  },
  applyFilters: filters => {
    dispatch(setFilters('visible', false))
    dispatch(setFilters('location', filters.location))
    dispatch(setFilters('date', filters.date))
    dispatch(setFilters('numOfReviews', filters.numOfReviews))
    dispatch(setFilters('numOfParticipants', filters.numOfParticipants))
    dispatch(
      setFilters(
        'hideMapathonsWithZeroReviews',
        filters.hideMapathonsWithZeroReviews
      )
    )
    dispatch(setLoadingMapathons(true))
    dispatch(setMapathons([]))
    // dispatch(setNextPage(''))
    dispatch(getMapathons(filters))
  },
  showPopup: () => {
    // dispatch(setShowSearchHere(false))
    dispatch(setPopupVisibility(true))
  },
  hidePopup: () => {
    dispatch(setPopupVisibility(false))
  },
  showFilters: () => {
    dispatch(setFilters('visible', true))
  }
})

const MapathonsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mapathons)

export default MapathonsPage
