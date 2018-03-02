import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import appSelector from '../App/selector'
import User from '../../components/User'

import { clearState, getUser } from './actions'
import userSelector from './selector'

const mapStateToProps = createStructuredSelector({
  loadingUser: userSelector('loadingUser'),
  user: userSelector('user'),
  notificationMessage: userSelector('notificationMessage'),
  sendingRequest: appSelector('sendingRequest')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getUser: () => {
    dispatch(getUser(ownProps.match.params.userId))
  },
  clearState: () => {
    dispatch(clearState())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
