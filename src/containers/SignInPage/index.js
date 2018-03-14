import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import SignIn from '../../components/SignIn'

import makeSelectSignIn from './selector'
import {
  clearState,
  setData,
  setErrors,
  signInRequest,
  toggleShowPassword
} from './actions'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectApp('isAuthenticated'),
  data: makeSelectSignIn('data'),
  errors: makeSelectSignIn('errors'),
  showPassword: makeSelectSignIn('showPassword'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  clearState: () => {
    dispatch(clearState())
  },
  onFormSubmit: e => {
    e.preventDefault()
    dispatch(signInRequest())
  },
  onDataChange: e => {
    dispatch(setData(e.target.id, e.target.value))
  },
  onInputFocus: e => {
    dispatch(setErrors(e.target.id, ''))
  },
  onShowPasswordChange: () => {
    dispatch(toggleShowPassword())
  }
})

const SignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignIn)

export default SignUpPage
