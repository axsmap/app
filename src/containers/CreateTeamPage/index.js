import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setIsVisible as setNotificationIsVisible } from '../Notification/actions'
import makeSelectApp from '../App/selector'
import CreateTeamComp from '../../components/CreateTeam'

import {
  clearState,
  createTeam,
  setErrors,
  setNotificationMessage
} from './actions'
import makeSelectTeam from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectApp('isAuthenticated'),
  sendingRequest: makeSelectApp('sendingRequest'),
  notificationMessage: makeSelectTeam('notificationMessage'),
  errors: makeSelectTeam('errors')
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
  createTeam: data => {
    dispatch(createTeam(data, ownProps.history.push))
  }
})

const CreateTeam = connect(mapStateToProps, mapDispatchToProps)(CreateTeamComp)

export default CreateTeam
