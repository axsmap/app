import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import {
  getMapathons,
  setLoadingMapathons,
  setNextPage as setNextMapathonsPage,
  setMapathons
} from '../MapathonsPage/actions'
import {
  getTeams,
  setLoadingTeams,
  setNextPage as setNextTeamsPage,
  setTeams
} from '../TeamsPage/actions'
import {
  getVenues,
  setFilters,
  setLoadingVenues,
  setNextPage,
  setVenues,
  setVisibleVenues,
  setWelcomeVisibility
} from '../VenuesPage/actions'
import { setWelcomeVisibility as setVenueWelcomeVisibility } from '../VenuePage/actions'
import appSelector from '../App/selector'
import TopBarComp from '../../components/TopBar'

import { setKeywords, signOutRequest, setName } from './actions'
import topBarSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  keywords: topBarSelector('keywords'),
  address: topBarSelector('address'),
  userData: appSelector('userData'),
  sendingRequest: appSelector('sendingRequest'),
  name: topBarSelector('name')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearKeywords: () => {
    dispatch(setKeywords(''))
  },
  handleQuerySubmit: e => {
    e.preventDefault()
    e.target.elements[0].blur()

    if (ownProps.location.pathname.startsWith('/teams')) {
      if (ownProps.location.pathname === '/teams') {
        dispatch(setLoadingTeams(true))
        dispatch(setTeams([]))
        dispatch(setNextTeamsPage(null))
        dispatch(getTeams())
      } else {
        ownProps.history.push('/teams')
      }

      return
    }
    if (ownProps.location.pathname.startsWith('/mapathons')) {
      if (ownProps.location.pathname === '/mapathons') {
        dispatch(setLoadingMapathons(true))
        dispatch(setMapathons([]))
        dispatch(setNextMapathonsPage(null))
        dispatch(getMapathons())
      } else {
        ownProps.history.push('/mapathons')
      }

      return
    }
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
  handleAddressChange: e => {
    dispatch(setName(e.target.value))
  },
  handleKeywordsReset: () => {
    dispatch(setKeywords(''))
  },
  handleAddressReset: () => {
    dispatch(setName(''))
  },
  showFilters: () => {
    dispatch(setFilters('visible', true))
  },
  handleSignOutClick: () => {
    dispatch(signOutRequest())
  },
  setWelcomeVisibility: () => {
    dispatch(setWelcomeVisibility(true))
  },
  setVenueWelcomeVisibility: () => {
    dispatch(setVenueWelcomeVisibility(true))
  }
})

const TopBar = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopBarComp)
)

export default TopBar
