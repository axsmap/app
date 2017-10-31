import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Account from '../../components/Account'
import makeSelectApp from '../App/selector'
import { setCurrentUrl } from '../TopBar/actions'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated')
})

const mapDispatchToProps = dispatch => ({
  setAccountUrl: () => {
    dispatch(setCurrentUrl('/account'))
  }
})

const AccountPage = connect(mapStateToProps, mapDispatchToProps)(Account)

export default AccountPage
