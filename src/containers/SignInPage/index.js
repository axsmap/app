import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import makeSelectProgressBar from '../ProgressBar/selector'
import { setCurrentUrl } from '../TopBar/actions'
import SignIn from '../../components/SignIn'

import makeSelectSignIn from './selector'

import {
  setData,
  setErrors,
  signInRequest,
  toggleShowPassword
} from './actions'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated'),
  progressPercent: makeSelectProgressBar('percent'),
  errorMessage: makeSelectSignIn('errorMessage'),
  bruteForceMessage: makeSelectSignIn('bruteForceMessage'),
  data: makeSelectSignIn('data'),
  errors: makeSelectSignIn('errors'),
  showPassword: makeSelectSignIn('showPassword'),
  currentlySending: makeSelectSignIn('currentlySending')
})

const mapDispatchToProps = dispatch => ({
  setUrl: () => {
    dispatch(setCurrentUrl('/sign-in'))
  },
  handleChangeData: e => {
    dispatch(setData(e.target.id, e.target.value))
  },
  onInputFocus: e => {
    dispatch(setErrors(e.target.id, ''))
  },
  handleShowPassword: () => {
    dispatch(toggleShowPassword())
  },
  handleSubmit: e => {
    e.preventDefault()
    dispatch(signInRequest())
  }
})

const SignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignIn)

export default SignUpPage
