import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ForgottenPassword from '../../components/ForgottenPassword'
import appSelector from '../App/selector'

import {
  clearState,
  forgottenPasswordRequest,
  setData,
  setErrors
} from './actions'
import forgottenPasswordSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  data: forgottenPasswordSelector('data'),
  errors: forgottenPasswordSelector('errors'),
  sendingRequest: appSelector('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  clearState: () => {
    dispatch(clearState())
  },
  onFormSubmit: e => {
    e.preventDefault()
    dispatch(forgottenPasswordRequest())
  },
  onDataChange: e => {
    dispatch(setData(e.target.id, e.target.value))
  },
  onInputFocus: e => {
    dispatch(setErrors(e.target.id, ''))
  }
})

const ForgottenPasswordPage = connect(mapStateToProps, mapDispatchToProps)(
  ForgottenPassword
)

export default ForgottenPasswordPage
