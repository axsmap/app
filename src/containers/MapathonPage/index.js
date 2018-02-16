import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Mapathon from '../../components/Mapathon'
import appSelector from '../App/selector'

import mapathonSelector from './selector'
import { clearState, getMapathon, setNotificationMessage } from './actions'

const mapStateToProps = createStructuredSelector({
  loadingMapathon: mapathonSelector('loadingMapathon'),
  mapathon: mapathonSelector('mapathon'),
  notificationMessage: mapathonSelector('notificationMessage'),
  sendingRequest: appSelector('sendingRequest')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getMapathon: () => {
    dispatch(getMapathon(ownProps.match.params.mapathonId))
  },
  clearState: () => {
    dispatch(clearState())
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Mapathon)
