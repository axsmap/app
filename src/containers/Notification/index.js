import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import NotificationComp from '../../components/Notification'
import appSelector from '../App/selector'

import { setIsVisible, setMessage } from './actions'
import notificationSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isVisible: notificationSelector('isVisible'),
  type: notificationSelector('type'),
  message: notificationSelector('message'),
  sendingRequest: appSelector('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  close: () => {
    dispatch(setIsVisible(false))
  },
  setMessage: message => {
    dispatch(setMessage(message))
    if (message) dispatch(setIsVisible(true))
    else dispatch(setIsVisible(false))
  }
})

const Notification = connect(mapStateToProps, mapDispatchToProps)(
  NotificationComp
)

export default Notification
