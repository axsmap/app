import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelect from './selector'

import ResetPassword from '../../components/ResetPassword'

import { changeData, resetPasswordRequest, toggleShowPassword } from './actions'

const mapStateToProps = createStructuredSelector({
  successMessage: makeSelect('successMessage'),
  errorMessage: makeSelect('errorMessage'),
  data: makeSelect('data'),
  errors: makeSelect('errors'),
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
    dispatch(resetPasswordRequest())
  }
})

const ResetPasswordPage = connect(mapStateToProps, mapDispatchToProps)(
  ResetPassword
)

export default ResetPasswordPage
