import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ForgottenPassword from '../../components/ForgottenPassword'
import makeSelectApp from '../App/selector'
import { setCurrentUrl } from '../TopBar/actions'

import { forgottenPasswordRequest, setData, setErrors } from './actions'
import makeSelectForgottenPassword from './selector'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated'),
  messageType: makeSelectForgottenPassword('messageType'),
  data: makeSelectForgottenPassword('data'),
  errors: makeSelectForgottenPassword('errors'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  setUrl: () => {
    dispatch(setCurrentUrl('/forgotten-password'))
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
