import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage
} from '../Notification/actions'
import appSelector from '../App/selector'
import Team from '../../components/Team'

import {
  clearErrors,
  clearInvitationsState,
  clearState,
  createAvatar,
  createPetition,
  deleteAvatar,
  editTeam,
  getTeam,
  getUsers,
  joinTeam,
  promoteMember,
  removeManager,
  removeMember,
  setEditIsVisible,
  setErrors
} from './actions'
import teamSelector from './selector'

const mapStateToProps = createStructuredSelector({
  loadingTeam: teamSelector('loadingTeam'),
  team: teamSelector('team'),
  avatar: teamSelector('avatar'),
  isAuthenticated: appSelector('isAuthenticated'),
  userData: appSelector('userData'),
  editIsVisible: teamSelector('editIsVisible'),
  errors: teamSelector('errors'),
  loadingUsers: teamSelector('loadingUsers'),
  users: teamSelector('users'),
  sendingRequest: appSelector('sendingRequest')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getTeam: () => {
    dispatch(getTeam(ownProps.match.params.teamId))
  },
  clearState: () => {
    dispatch(clearState())
  },
  clearErrors: () => {
    dispatch(clearErrors())
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
    if (notificationMessage) dispatch(setNotificationIsVisible(true))
    else dispatch(setNotificationIsVisible(false))
  },
  joinTeam: (teamId, userId) => {
    dispatch(joinTeam(teamId, userId))
  },
  showEditTeam: () => {
    dispatch(setEditIsVisible(true))
  },
  clearError: key => {
    dispatch(setErrors(key, ''))
  },
  createAvatar: data => {
    dispatch(createAvatar(data))
  },
  deleteAvatar: () => {
    dispatch(deleteAvatar())
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
