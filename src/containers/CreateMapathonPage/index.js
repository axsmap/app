import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage
} from '../Notification/actions'
import CreateMapathonComp from '../../components/CreateMapathon'
import appSelector from '../App/selector'

import {
  clearState,
  createMapathon,
  createPoster,
  deletePoster,
  getTeams,
  getUserLocation,
  setErrors,
  setLocationCoordinates
} from './actions'
import createMapathonSelector from './selector'

const mapStateToProps = createStructuredSelector({
  isAuthenticated: appSelector('isAuthenticated'),
  sendingRequest: appSelector('sendingRequest'),
  poster: createMapathonSelector('poster'),
  locationCoordinates: createMapathonSelector('locationCoordinates'),
  errors: createMapathonSelector('errors'),
  loadingTeams: createMapathonSelector('loadingTeams'),
  teams: createMapathonSelector('teams')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearState: () => {
    dispatch(clearState())
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
    if (notificationMessage) dispatch(setNotificationIsVisible(true))
    else dispatch(setNotificationIsVisible(false))
  },
  clearError: key => {
    dispatch(setErrors(key, ''))
  },
  createPoster: data => {
    dispatch(createPoster(data))
  },
  deletePoster: () => {
    dispatch(deletePoster())
  },
  getUserLocation: () => {
    dispatch(getUserLocation())
  },
  setLocationCoordinates: event => {
    dispatch(
      setLocationCoordinates({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
    )
  },
  getTeams: keywords => {
    dispatch(getTeams(keywords))
  },
  createMapathon: data => {
    dispatch(createMapathon(data, ownProps.history.push))
  }
})

const CreateMapathonPage = connect(mapStateToProps, mapDispatchToProps)(
  CreateMapathonComp
)

export default CreateMapathonPage
