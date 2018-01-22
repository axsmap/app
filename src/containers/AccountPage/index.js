import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Account from '../../components/Account'
import makeSelectApp from '../App/selector'

import { signOutRequest } from '../TopBar/actions'

const mapStateToProps = createStructuredSelector({
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = { signOutRequest }

const AccountPage = connect(mapStateToProps, mapDispatchToProps)(Account)

export default AccountPage
