import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  getVenues,
  setFilters,
  setLoadingVenues,
  setNextPage,
  setVenues,
  setVisibleVenues
} from '../VenuesPage/actions'
import makeSelectApp from '../App/selector'
import makeSelectVenues from '../VenuesPage/selector'
import TopBarComp from '../../components/TopBar'

import makeSelectTopBar from './selector'
import { setKeywords, signOutRequest } from './actions'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated'),
  keywords: makeSelectTopBar('keywords'),
  filters: makeSelectVenues('filters'),
  currentUrl: makeSelectTopBar('currentUrl'),
  userData: makeSelectApp('userData'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  handleVenuesQuerySubmit: event => {
    event.preventDefault()
    dispatch(setLoadingVenues(true))
    dispatch(setVenues([]))
    dispatch(setVisibleVenues([]))
    dispatch(setNextPage(''))
    dispatch(getVenues())
  },
  handleKeywordsChange: e => {
    dispatch(setKeywords(e.target.value))
  },
  showFilters: () => {
    dispatch(setFilters('visible', true))
  },
  handleVenuesTypeChange: e => {
    dispatch(setFilters('type', e.target.value))
    dispatch(setLoadingVenues(true))
    dispatch(setVenues([]))
    dispatch(setVisibleVenues([]))
    dispatch(setNextPage(''))
    dispatch(getVenues())
  },
  handleSignOutClick: () => {
    dispatch(signOutRequest())
  }
})

const TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBarComp)

export default TopBar
