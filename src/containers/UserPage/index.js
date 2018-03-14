import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage
} from '../Notification/actions'
import appSelector from '../App/selector'
import User from '../../components/User'

import {
  clearErrors,
  clearState,
  createAvatar,
  deleteAvatar,
  editUser,
  getUser,
  leaveMapathon,
  leaveTeam,
  setEditIsVisible,
  setErrors,
  signOut,
  clearPetitionsState,
  getPetitions,
  setFilterReceived,
  setFilterSent,
  setPetitionAccepted,
  setPetitionCanceled,
  setPetitionRejected
} from './actions'
import userSelector from './selector'

const mapStateToProps = createStructuredSelector({
  loadingUser: userSelector('loadingUser'),
  user: userSelector('user'),
  avatar: userSelector('avatar'),
  sendingRequest: appSelector('sendingRequest'),
  isAuthenticated: appSelector('isAuthenticated'),
  userData: appSelector('userData'),
  editIsVisible: userSelector('editIsVisible'),
  errors: userSelector('errors'),
  filter: userSelector('filter'),
  loadingPetitions: userSelector('loadingPetitions'),
  nextPage: userSelector('nextPage'),
  petitions: userSelector('petitions')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getUser: () => {
    dispatch(getUser(ownProps.match.params.userId))
  },
  clearState: () => {
    dispatch(clearState())
  },
  showEditUser: () => {
    dispatch(setEditIsVisible(true))
  },
  clearErrors: () => {
    dispatch(clearErrors())
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
    if (notificationMessage) dispatch(setNotificationIsVisible(true))
    else dispatch(setNotificationIsVisible(false))
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
  leaveTeam: teamId => {
    dispatch(leaveTeam(teamId))
  },
  leaveMapathon: mapathonId => {
    dispatch(leaveMapathon(mapathonId))
  },
  signOut: () => {
    dispatch(signOut())
  },
  getPetitions: () => {
    dispatch(getPetitions())
  },
  onClickFilterReceived: () => {
    dispatch(clearPetitionsState())
    dispatch(setFilterReceived())
    dispatch(getPetitions())
  },
  onClickFilterSent: () => {
    dispatch(clearPetitionsState())
    dispatch(setFilterSent())
    dispatch(getPetitions())
  },
  setPetitionAccepted: id => () => {
    dispatch(setPetitionAccepted(id))
  },
  setPetitionCanceled: id => () => {
    dispatch(setPetitionCanceled(id))
  },
  setPetitionRejected: id => () => {
    dispatch(setPetitionRejected(id))
  },
  hideEditUser: () => {
    dispatch(setEditIsVisible(false))
  },
  editUser: data => {
    dispatch(editUser(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
