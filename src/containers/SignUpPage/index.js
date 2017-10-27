import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import makeSelectProgressBar from '../ProgressBar/selector'
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
  progressPercent: makeSelectProgressBar('percent'),
  successMessage: makeSelectSignUp('successMessage'),
  errorMessage: makeSelectSignUp('errorMessage'),
  bruteForceMessage: makeSelectSignUp('bruteForceMessage'),
  data: makeSelectSignUp('data'),
  errors: makeSelectSignUp('errors'),
  showPassword: makeSelectSignUp('showPassword'),
  currentlySending: makeSelectSignUp('currentlySending')
})

const mapDispatchToProps = dispatch => ({
  setUrl: () => {
    dispatch(setCurrentUrl('/sign-up'))
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
  handleIsSubscribed: () => {
    dispatch(toggleIsSubscribed())
  },
  handleSubmit: e => {
    e.preventDefault()
    dispatch(signUpRequest())
  }
})

const SignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignUpPage
