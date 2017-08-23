import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelect from './selector'

import ForgottenPassword from '../../components/ForgottenPassword'

import { changeData, forgottenPasswordRequest } from './actions'

const mapStateToProps = createStructuredSelector({
  successMessage: makeSelect('successMessage'),
  errorMessage: makeSelect('errorMessage'),
  currentlySending: makeSelect('currentlySending'),
  data: makeSelect('data'),
  errors: makeSelect('errors')
})

const mapDispatchToProps = dispatch => ({
  handleChangeData: e => {
    dispatch(changeData(e.target.id, e.target.value))
  },
  handleSubmit: e => {
    e.preventDefault()
    dispatch(forgottenPasswordRequest())
  }
})

const ForgottenPasswordPage = connect(mapStateToProps, mapDispatchToProps)(
  ForgottenPassword
)

export default ForgottenPasswordPage
