import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import WelcomePageComp from '../../components/Venues/WelcomePage'

import { setWelcomeName } from './actions'
import welcomePageSelector from './selector'

import {
  getTeams,
  setLoadingTeams,
  setNextPage as setNextTeamsPage,
  setTeams
} from '../TeamsPage/actions'
import {
  getMapathons,
  setLoadingMapathons,
  setNextPage as setNextMapathonsPage,
  setMapathons
} from '../MapathonsPage/actions'
import {
  getVenues,
  setLoadingVenues,
  setNextPage,
  setVenues,
  setVisibleVenues,
  setWelcomeVisibility,
  setUsesVisibility
} from '../VenuesPage/actions'
import {
  getVenue,
  setLoadingVenue,
  setVenue,
  setWelcomeVisibility as setVenueWelcomeVisibility,
  setUsesVisibility as setVenueUsesVisibility
} from '../VenuePage/actions'

import { setName } from '../TopBar/actions'

const mapStateToProps = createStructuredSelector({
  address: welcomePageSelector('address'),
  name: welcomePageSelector('name')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
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
    if (ownProps.location.pathname.startsWith('/venues')) {
      if (ownProps.location.pathname === '/venues') {
        dispatch(getVenue())
        dispatch(setLoadingVenue(true))
        dispatch(setVenue(''))
        dispatch(setVenueWelcomeVisibility(false))
        dispatch(setVenueUsesVisibility(false))
        dispatch(setVenueUsesVisibility(false))
      } else {
        ownProps.history.push('/venues')
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
    dispatch(setName(e.target.elements[0].value))
    dispatch(getVenues())
    dispatch(setWelcomeVisibility(false))
    dispatch(setUsesVisibility(false))
    dispatch(setUsesVisibility(false))
    dispatch(setWelcomeName(''))
  },
  handleWelcomeAddressChange: e => {
    dispatch(setWelcomeName(e.target.value))
  },
  handleWelcomeAddressReset: e => {
    e.preventDefault()
    dispatch(setWelcomeName(''))
  }
})

const WelcomePage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WelcomePageComp)
)

export default WelcomePage
