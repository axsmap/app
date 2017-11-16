import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { setCurrentUrl } from '../TopBar/actions'
import VenuesComp from '../../components/Venues'

import { getVenues } from './actions'
import makeSelectVenues from './selector'

const mapStateToProps = createStructuredSelector({
  loadingMap: makeSelectVenues('loadingMap'),
  location: makeSelectVenues('location'),
  visibleVenues: makeSelectVenues('visibleVenues')
})

const mapDispatchToProps = dispatch => ({
  setVenuesUrl: () => {
    dispatch(setCurrentUrl('/'))
  },
  getVenues: () => {
    dispatch(getVenues())
  }
})

const VenuesPage = connect(mapStateToProps, mapDispatchToProps)(VenuesComp)

export default VenuesPage
