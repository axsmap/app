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
  showPassword: makeSelect('showPassword'),
  success: makeSelect('success')
})

const mapDispatchToProps = dispatch => ({
  handleChangeData: e => {
    dispatch(changeData(e.target.id, e.target.value))
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
