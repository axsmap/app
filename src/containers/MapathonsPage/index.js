import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Mapathons from '../../components/Mapathons'

import { clearState, getMapathons } from './actions'
import makeSelectMapathons from './selector'

const mapStateToProps = createStructuredSelector({
  sendingRequest: makeSelectApp('sendingRequest'),
  loadingMapathons: makeSelectMapathons('loadingMapathons'),
  nextPage: makeSelectMapathons('nextPage'),
  mapathons: makeSelectMapathons('mapathons')
})

const mapDispatchToProps = dispatch => ({
  getMapathons: () => {
    dispatch(getMapathons())
  },
  clearState: () => {
    dispatch(clearState())
  }
})

const MapathonsPage = connect(mapStateToProps, mapDispatchToProps)(Mapathons)

export default MapathonsPage
