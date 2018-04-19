import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setReferrer } from '../App/actions'
import appSelector from '../App/selector'
import SignIn from '../../components/SignIn'

import {
  clearState,
  setData,
  setErrors,
  signInRequest,
  toggleShowPassword
} from './actions'
import signInSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  referrer: appSelector('referrer'),
  data: signInSelector('data'),
  errors: signInSelector('errors'),
  showPassword: signInSelector('showPassword'),
  sendingRequest: appSelector('sendingRequest')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearState: () => {
    dispatch(clearState())
  },
  onFormSubmit: ({ referrer }) => {
    dispatch(setReferrer(referrer || ''))
    dispatch(signInRequest(ownProps.history.push))
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
