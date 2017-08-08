import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import SignUp from '../../components/SignUp'

import makeSelectSignUp from './selector'

import {
  changeData,
  signUpRequest,
  toggleIsSubscribed,
  toggleShowPassword
} from './actions'

const mapStateToProps = createStructuredSelector({
  successMessage: makeSelectSignUp('successMessage'),
  errorMessage: makeSelectSignUp('errorMessage'),
  data: makeSelectSignUp('data'),
  errors: makeSelectSignUp('errors'),
  showPassword: makeSelectSignUp('showPassword'),
  currentlySending: makeSelectSignUp('currentlySending'),
  authenticated: makeSelectApp('authenticated')
})

const mapDispatchToProps = dispatch => ({
  handleChangeData: e => {
    dispatch(changeData(e.target.id, e.target.value))
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
