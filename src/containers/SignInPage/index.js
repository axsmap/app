import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import SignIn from '../../components/SignIn'

import makeSelectSignIn from './selector'

import { changeData, signInRequest, toggleShowPassword } from './actions'

const mapStateToProps = createStructuredSelector({
  errorMessage: makeSelectSignIn('errorMessage'),
  data: makeSelectSignIn('data'),
  errors: makeSelectSignIn('errors'),
  showPassword: makeSelectSignIn('showPassword'),
  currentlySending: makeSelectSignIn('currentlySending'),
  authenticated: makeSelectApp('authenticated')
})

const mapDispatchToProps = dispatch => ({
  handleChangeData: e => {
    dispatch(changeData(e.target.id, e.target.value))
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
