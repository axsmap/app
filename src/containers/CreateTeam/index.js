import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setIsVisible as setNotificationIsVisible } from '../Notification/actions'
import { setCurrentUrl } from '../TopBar/actions'
import makeSelectApp from '../App/selector'
import CreateTeamComp from '../../components/CreateTeam'

import {
  clearState,
  createTeam,
  setLoadingPhoto,
  setNotificationMessage
} from './actions'
import makeSelectTeam from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectApp('isAuthenticated'),
  sendingRequest: makeSelectApp('sendingRequest'),
  notificationMessage: makeSelectTeam('notificationMessage'),
  loadingPhoto: makeSelectTeam('loadingPhoto')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearCurrentUrl: () => {
    dispatch(setCurrentUrl(''))
  },
  goToSignIn: () => {
    ownProps.history.push('/sign-in')
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
    if (notificationMessage) dispatch(setNotificationIsVisible(true))
    else dispatch(setNotificationIsVisible(false))
  },
  setLoadingPhoto: loadingPhoto => {
    dispatch(setLoadingPhoto(loadingPhoto))
  },
  clearState: () => {
    dispatch(clearState())
  },
  createTeam: data => {
    dispatch(createTeam(data))
  }
})

const CreateTeam = connect(mapStateToProps, mapDispatchToProps)(CreateTeamComp)

export default CreateTeam
