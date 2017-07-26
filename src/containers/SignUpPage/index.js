import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  makeSelectSuccessMessage,
  makeSelectErrorMessage,
  makeSelectData,
  makeSelectErrors,
  makeSelectShowPassword
} from './selectors'
import SignUp from '../../components/SignUp'

import {
  changeData,
  signUpRequest,
  toggleIsSubscribed,
  toggleShowPassword
} from './actions'

const mapStateToProps = createStructuredSelector({
  successMessage: makeSelectSuccessMessage(),
  errorMessage: makeSelectErrorMessage(),
  data: makeSelectData(),
  errors: makeSelectErrors(),
  showPassword: makeSelectShowPassword()
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
