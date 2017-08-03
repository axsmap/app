import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelect from './selector'
import SignIn from '../../components/SignIn'

import { changeData, signInRequest, toggleShowPassword } from './actions'

const mapStateToProps = createStructuredSelector({
  errorMessage: makeSelect('errorMessage'),
  data: makeSelect('data'),
  showPassword: makeSelect('showPassword')
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
