import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import TopBarComp from '../../components/TopBar'

import makeSelectTopBar from './selector'
import { setQuery, signOutRequest } from './actions'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated'),
  query: makeSelectTopBar('query'),
  currentUrl: makeSelectTopBar('currentUrl'),
  userData: makeSelectApp('userData'),
  sendingRequest: makeSelectApp('sendingRequest')
})

const mapDispatchToProps = dispatch => ({
  onVenuesQuerySubmit: () => {},
  onQueryChange: e => {
    dispatch(setQuery(e.target.id, e.target.value))
  },
  onSignOutClick: () => {
    dispatch(signOutRequest())
  }
})

const TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBarComp)

export default TopBar
