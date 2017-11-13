import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import PrivateRoute from '../../components/PrivateRoute'

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectApp('authenticated')
})

export default connect(mapStateToProps)(PrivateRoute)
