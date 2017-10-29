import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import TabBarComp from '../../components/TabBar'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated'),
  userData: makeSelectApp('userData')
})

const TabBar = connect(mapStateToProps, null)(TabBarComp)

export default TabBar
