import { connect } from 'react-redux'

import Mapathons from '../../components/Mapathons'
import { setCurrentUrl } from '../TopBar/actions'

const mapDispatchToProps = dispatch => ({
  setMapathonsUrl: () => {
    dispatch(setCurrentUrl('/mapathons'))
  }
})

const MapathonsPage = connect(null, mapDispatchToProps)(Mapathons)

export default MapathonsPage
