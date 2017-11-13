import { connect } from 'react-redux'

import Account from '../../components/Account'
import { setCurrentUrl } from '../TopBar/actions'

const mapDispatchToProps = dispatch => ({
  setAccountUrl: () => {
    dispatch(setCurrentUrl('/account'))
  }
})

const AccountPage = connect(null, mapDispatchToProps)(Account)

export default AccountPage
