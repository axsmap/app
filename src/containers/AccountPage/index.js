import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Account from '../../components/Account'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated')
})

const AccountPage = connect(mapStateToProps)(Account)

export default AccountPage
