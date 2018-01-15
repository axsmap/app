import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Team from '../../components/Team'

import makeSelectTeam from './selector'
import { clearState, getTeam, setEditIsVisible } from './actions'

const mapStateToProps = createStructuredSelector({
  notificationMessage: makeSelectTeam('notificationMessage'),
  isAuthenticated: makeSelectApp('isAuthenticated'),
  userData: makeSelectApp('userData'),
  editIsVisible: makeSelectTeam('editIsVisible'),
  sendingRequest: makeSelectApp('sendingRequest'),
  team: makeSelectTeam('team')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getTeam: () => {
    dispatch(getTeam(ownProps.match.params.teamId))
  },
  clearState: () => {
    dispatch(clearState())
  },
  showEditTeam: () => {
    dispatch(setEditIsVisible(true))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Team)
