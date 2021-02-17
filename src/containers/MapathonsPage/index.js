import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectApp from '../App/selector'
import Mapathons from '../../components/Mapathons'

import { clearState, getMapathons, getHighlightedEvents } from './actions'
import makeSelectMapathons from './selector'

const mapStateToProps = createStructuredSelector({
  sendingRequest: makeSelectApp('sendingRequest'),
  loadingMapathons: makeSelectMapathons('loadingMapathons'),
  nextPage: makeSelectMapathons('nextPage'),
  mapathons: makeSelectMapathons('mapathons'),
  highlightedEvents: makeSelectMapathons('highlightedEvents'),
  loadingMapathonsMap: makeSelectMapathons('loadingMapathonsMap')
})

const mapDispatchToProps = dispatch => ({
  getMapathons: () => {
    dispatch(getMapathons())
  },
  clearState: () => {
    dispatch(clearState())
  },
  getHighlightedEvents: () => {
    dispatch(getHighlightedEvents())
  }
})

const MapathonsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mapathons)

export default MapathonsPage
