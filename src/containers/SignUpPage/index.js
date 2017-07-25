import { connect } from 'react-redux'

import SignUp from '../../components/SignUp'

import { signUpRequest, toggleIsSubscribed, toggleShowPassword } from './actions'

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: () => {
    dispatch(signUpRequest(ownProps.data))
  },
  handleShowPassword: () => {
    dispatch(toggleShowPassword())
  },
  handleIsSubscribed: () => {
    dispatch(toggleIsSubscribed())
  }
})

const SignUpPage = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignUpPage
