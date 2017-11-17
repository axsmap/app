import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import NotificationComp from '../../components/Notification'

import { setVisibility } from './actions'
import makeSelectNotification from './selector'

const mapStateToProps = createStructuredSelector({
  category: makeSelectNotification('category'),
  visibility: makeSelectNotification('visibility')
})

const mapDispatchToProps = dispatch => ({
  close: () => {
    dispatch(setVisibility(false))
  }
})

const Notification = connect(mapStateToProps, mapDispatchToProps)(
  NotificationComp
)

export default Notification
