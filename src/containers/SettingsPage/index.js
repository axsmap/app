import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Settings from '../../components/Settings'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated')
})

const SettingsPage = connect(mapStateToProps)(Settings)

export default SettingsPage
