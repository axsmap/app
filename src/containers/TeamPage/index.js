import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Team from '../../components/Team'

import makeSelectTeam from './selector'
import {
  clearInvitationsState,
  clearState,
  createPetition,
  editTeam,
  getTeam,
  getUsers,
  promoteMember,
  removeManager,
  removeMember,
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
  loadingUsers: makeSelectTeam('loadingUsers'),
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
  removeManager: (teamId, userId) => {
    dispatch(removeManager(teamId, userId))
  },
  promoteMember: (teamId, userId) => {
    dispatch(promoteMember(teamId, userId))
  },
  removeMember: (teamId, userId) => {
    dispatch(removeMember(teamId, userId))
  },
  clearInvitationsState: () => {
    dispatch(clearInvitationsState())
  },
  getUsers: keywords => {
    dispatch(getUsers(keywords))
  },
  inviteUser: userId => {
    dispatch(createPetition(userId))
  },
  hideEditTeam: () => {
    dispatch(setEditIsVisible(false))
  },
  editTeam: (teamId, data) => {
    dispatch(editTeam(teamId, data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Team)
