import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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
  isAuthenticated: makeSelectApp('isAuthenticated'),
  keywords: makeSelectTopBar('keywords'),
  filters: makeSelectVenues('filters'),
  currentUrl: makeSelectTopBar('currentUrl'),
  userData: makeSelectApp('userData'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleVenuesQuerySubmit: event => {
    event.preventDefault()
    event.target.elements[0].blur()

    if (ownProps.location.pathname !== '/') {
      ownProps.history.push('/')
      return
    }

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

    if (ownProps.location.pathname !== '/') {
      ownProps.history.push('/')
      return
    }

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

const TopBar = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopBarComp)
)

export default TopBar
