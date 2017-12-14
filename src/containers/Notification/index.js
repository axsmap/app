import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import NotificationComp from '../../components/Notification'
import makeSelectApp from '../App/selector'

import { setIsVisible } from './actions'
import makeSelectNotification from './selector'

const mapStateToProps = createStructuredSelector({
  isVisible: makeSelectNotification('isVisible'),
  type: makeSelectNotification('type'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  close: () => {
    dispatch(setIsVisible(false))
  }
})

const Notification = connect(mapStateToProps, mapDispatchToProps)(
  NotificationComp
)

export default Notification
