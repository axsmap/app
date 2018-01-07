import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ForgottenPassword from '../../components/ForgottenPassword'
import makeSelectApp from '../App/selector'

import {
  clearState,
  forgottenPasswordRequest,
  setData,
  setErrors
} from './actions'
import makeSelectForgottenPassword from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectApp('isAuthenticated'),
  notificationMessage: makeSelectForgottenPassword('notificationMessage'),
  data: makeSelectForgottenPassword('data'),
  errors: makeSelectForgottenPassword('errors'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  clearState: () => {
    dispatch(clearState())
  },
  onFormSubmit: e => {
    e.preventDefault()
    dispatch(forgottenPasswordRequest())
  },
  onDataChange: e => {
    dispatch(setData(e.target.id, e.target.value))
  },
  onInputFocus: e => {
    dispatch(setErrors(e.target.id, ''))
  }
})

const ForgottenPasswordPage = connect(mapStateToProps, mapDispatchToProps)(
  ForgottenPassword
)

export default ForgottenPasswordPage
