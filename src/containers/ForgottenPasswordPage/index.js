import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ForgottenPassword from '../../components/ForgottenPassword'
import makeSelectApp from '../App/selector'
import { setCurrentUrl } from '../TopBar/actions'

import { forgottenPasswordRequest, setData, setErrors } from './actions'
import makeSelectForgottenPassword from './selector'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated'),
  successMessage: makeSelectForgottenPassword('successMessage'),
  errorMessage: makeSelectForgottenPassword('errorMessage'),
  bruteForceMessage: makeSelectForgottenPassword('bruteForceMessage'),
  currentlySending: makeSelectForgottenPassword('currentlySending'),
  data: makeSelectForgottenPassword('data'),
  errors: makeSelectForgottenPassword('errors')
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
  handleSubmit: e => {
    e.preventDefault()
    dispatch(forgottenPasswordRequest())
  }
})

const ForgottenPasswordPage = connect(mapStateToProps, mapDispatchToProps)(
  ForgottenPassword
)

export default ForgottenPasswordPage
