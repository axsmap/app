import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage
} from '../Notification/actions'
import appSelector from '../App/selector'
import CreateTeamComp from '../../components/CreateTeam'

import {
  clearState,
  createAvatar,
  createTeam,
  deleteAvatar,
  setErrors
} from './actions'
import createTeamSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  sendingRequest: appSelector('sendingRequest'),
  avatar: createTeamSelector('avatar'),
  errors: createTeamSelector('errors')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearState: () => {
    dispatch(clearState())
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
  createTeam: data => {
    dispatch(createTeam(data, ownProps.history.push))
  }
})

const CreateTeam = connect(mapStateToProps, mapDispatchToProps)(CreateTeamComp)

export default CreateTeam
