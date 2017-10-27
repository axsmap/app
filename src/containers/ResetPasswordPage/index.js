import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import makeSelectProgressBar from '../ProgressBar/selector'
import ResetPassword from '../../components/ResetPassword'
import { setCurrentUrl } from '../TopBar/actions'

import makeSelectResetPassword from './selector'
import {
  resetPasswordRequest,
  setData,
  setErrors,
  toggleShowPassword
} from './actions'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated'),
  progressPercent: makeSelectProgressBar('percent'),
  successMessage: makeSelectResetPassword('successMessage'),
  errorMessage: makeSelectResetPassword('errorMessage'),
  bruteForceMessage: makeSelectResetPassword('bruteForceMessage'),
  data: makeSelectResetPassword('data'),
  errors: makeSelectResetPassword('errors'),
  showPassword: makeSelectResetPassword('showPassword'),
  currentlySending: makeSelectResetPassword('currentlySending'),
  success: makeSelectResetPassword('success')
})

const mapDispatchToProps = dispatch => ({
  setUrl: () => {
    dispatch(setCurrentUrl('/forgotten-password'))
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
  handleSubmit: locationSearch => e => {
    e.preventDefault()
    const key = locationSearch.split('key=')[1].split('&')[0]
    dispatch(resetPasswordRequest(key))
  }
})

const ResetPasswordPage = connect(mapStateToProps, mapDispatchToProps)(
  ResetPassword
)

export default ResetPasswordPage
