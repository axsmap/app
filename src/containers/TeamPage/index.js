import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Team from '../../components/Team'

import makeSelectTeam from './selector'
import {
  clearState,
  editTeam,
  getTeam,
  setEditIsVisible,
  setErrors,
  setNotificationMessage
} from './actions'

const mapStateToProps = createStructuredSelector({
  loadingTeam: makeSelectTeam('loadingTeam'),
  team: makeSelectTeam('team'),
  isAuthenticated: makeSelectApp('isAuthenticated'),
  userData: makeSelectApp('userData'),
  editIsVisible: makeSelectTeam('editIsVisible'),
  errors: makeSelectTeam('errors'),
  users: makeSelectTeam('users'),
  sendingRequest: makeSelectApp('sendingRequest'),
  notificationMessage: makeSelectTeam('notificationMessage')
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
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
  },
  clearError: key => {
    dispatch(setErrors(key, ''))
  },
  hideEditTeam: () => {
    dispatch(setEditIsVisible(false))
  },
  editTeam: (teamId, data) => {
    dispatch(editTeam(teamId, data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Team)
