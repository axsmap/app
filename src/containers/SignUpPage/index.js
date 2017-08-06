import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelect from './selector'
import SignUp from '../../components/SignUp'

import {
  changeData,
  signUpRequest,
  toggleIsSubscribed,
  toggleShowPassword
} from './actions'

const mapStateToProps = createStructuredSelector({
  successMessage: makeSelect('successMessage'),
  errorMessage: makeSelect('errorMessage'),
  data: makeSelect('data'),
  errors: makeSelect('errors'),
  showPassword: makeSelect('showPassword'),
  currentlySending: makeSelect('currentlySending')
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
