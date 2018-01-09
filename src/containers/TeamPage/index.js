import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Team from '../../components/Team'

import makeSelectTeam from './selector'
import { getTeam } from './actions'

const mapStateToProps = createStructuredSelector({
  sendingRequest: makeSelectApp('sendingRequest'),
  notificationMessage: makeSelectTeam('notificationMessage'),
  team: makeSelectTeam('team')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getTeam: () => {
    dispatch(getTeam(ownProps.match.params.teamId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Team)
