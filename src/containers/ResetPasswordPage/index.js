import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import ResetPassword from '../../components/ResetPassword'
import { setCurrentUrl } from '../TopBar/actions'

import makeSelectResetPassword from './selector'
import {
  clearState,
  resetPasswordRequest,
  setData,
  setErrors,
  toggleShowPassword
} from './actions'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectApp('isAuthenticated'),
  notificationMessage: makeSelectResetPassword('notificationMessage'),
  data: makeSelectResetPassword('data'),
  errors: makeSelectResetPassword('errors'),
  showPassword: makeSelectResetPassword('showPassword'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  setUrl: () => {
    dispatch(setCurrentUrl('/forgotten-password'))
  },
  clearState: () => {
    dispatch(clearState())
  },
  onFormSubmit: locationSearch => e => {
    e.preventDefault()
    const key = locationSearch.split('key=')[1].split('&')[0]
    dispatch(resetPasswordRequest(key))
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

const ResetPasswordPage = connect(mapStateToProps, mapDispatchToProps)(
  ResetPassword
)

export default ResetPasswordPage
