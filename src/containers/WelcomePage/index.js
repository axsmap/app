import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import WelcomePageComp from '../../components/Venues/WelcomePage'

import { setWelcomeAddress } from './actions'
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

import { setAddress } from '../TopBar/actions'

const mapStateToProps = createStructuredSelector({
  address: welcomePageSelector('address')
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
    } else if (ownProps.location.pathname.startsWith('/mapathons')) {
      if (ownProps.location.pathname === '/mapathons') {
        dispatch(setLoadingMapathons(true))
        dispatch(setMapathons([]))
        dispatch(setNextMapathonsPage(null))
        dispatch(getMapathons())
      } else {
        ownProps.history.push('/mapathons')
      }

      return
    } else if (ownProps.location.pathname !== '/') {
      ownProps.history.push('/')
      return
    }

    dispatch(setLoadingVenues(true))
    dispatch(setVenues([]))
    dispatch(setVisibleVenues([]))
    dispatch(setNextPage(''))
    dispatch(setAddress(e.target.elements[0].value))
    dispatch(getVenues())
    dispatch(setWelcomeVisibility(false))
    dispatch(setUsesVisibility(false))
    dispatch(setUsesVisibility(false))
    dispatch(setWelcomeAddress(''))
  },
  handleWelcomeAddressChange: e => {
    dispatch(setWelcomeAddress(e.target.value))
  },
  handleWelcomeAddressReset: e => {
    e.preventDefault()
    dispatch(setWelcomeAddress(''))
  }
})

const WelcomePage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WelcomePageComp)
)

export default WelcomePage
