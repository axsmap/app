import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import { setCurrentUrl } from '../TopBar/actions'
import Teams from '../../components/Teams'

import { getTeams } from './actions'
import makeSelectTeams from './selector'

const mapStateToProps = createStructuredSelector({
  sendingRequest: makeSelectApp('sendingRequest'),
  loadingTeams: makeSelectTeams('loadingTeams'),
  nextPage: makeSelectTeams('nextPage'),
  teams: makeSelectTeams('teams')
})

const mapDispatchToProps = dispatch => ({
  getTeams: () => {
    dispatch(getTeams())
  },
  setTeamsUrl: () => {
    dispatch(setCurrentUrl('/teams'))
  }
})

const TeamsPage = connect(mapStateToProps, mapDispatchToProps)(Teams)

export default TeamsPage
