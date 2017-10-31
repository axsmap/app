import { connect } from 'react-redux'

import { setCurrentUrl } from '../TopBar/actions'
import VenuesComp from '../../components/Venues'

const mapDispatchToProps = dispatch => ({
  setVenuesUrl: () => {
    dispatch(setCurrentUrl('/'))
  }
})

const VenuesPage = connect(null, mapDispatchToProps)(VenuesComp)

export default VenuesPage
