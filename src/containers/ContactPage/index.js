import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ContactComp from '../../components/Contact'
import appSelector from '../App/selector'

import { clearState, sendEmail, setError } from './actions'
import createMapathonSelector from './selector'

const mapStateToProps = createStructuredSelector({
  sendingRequest: appSelector('sendingRequest'),
  errors: createMapathonSelector('errors')
})

const mapDispatchToProps = dispatch => ({
  clearState: () => {
    dispatch(clearState())
  },
  clearError: key => {
    dispatch(setError(key, ''))
  },
  sendEmail: data => {
    dispatch(sendEmail(data))
  }
})

const ContactPage = connect(mapStateToProps, mapDispatchToProps)(ContactComp)

export default ContactPage
