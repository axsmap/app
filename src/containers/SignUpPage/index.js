import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import { setCurrentUrl } from '../TopBar/actions'
import SignUp from '../../components/SignUp'

import makeSelectSignUp from './selector'
import {
  setData,
  setErrors,
  signUpRequest,
  toggleIsSubscribed,
  toggleShowPassword
} from './actions'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated'),
  messageType: makeSelectSignUp('messageType'),
  data: makeSelectSignUp('data'),
  errors: makeSelectSignUp('errors'),
  showPassword: makeSelectSignUp('showPassword'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  setUrl: () => {
    dispatch(setCurrentUrl('/sign-up'))
  },
  onFormSubmit: e => {
    e.preventDefault()
    dispatch(signUpRequest())
  },
  onDataChange: e => {
    dispatch(setData(e.target.id, e.target.value))
  },
  onInputFocus: e => {
    dispatch(setErrors(e.target.id, ''))
  },
  onShowPasswordChange: () => {
    dispatch(toggleShowPassword())
  },
  onIsSubscribedChange: () => {
    dispatch(toggleIsSubscribed())
  }
})

const SignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignUpPage
