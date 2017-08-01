import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  makeSelectData,
  makeSelectErrorMessage,
  makeSelectErrors,
  makeSelectShowPassword,
  makeSelectSuccessMessage
} from './selectors'

import ResetPassword from '../../components/ResetPassword'

import { changeData, resetPasswordRequest, toggleShowPassword } from './actions'

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
  handleSubmit: e => {
    e.preventDefault()
    dispatch(resetPasswordRequest())
  }
})

const ResetPasswordPage = connect(mapStateToProps, mapDispatchToProps)(
  ResetPassword
)

export default ResetPasswordPage
