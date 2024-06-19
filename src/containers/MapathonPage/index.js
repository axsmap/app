import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage
} from '../Notification/actions'
import Mapathon from '../../components/Mapathon'
import appSelector from '../App/selector'

import {
  clearErrors,
  clearInvitationsState,
  clearState,
  createPetition,
  createPoster,
  deletePoster,
  editMapathon,
  getMapathon,
  getTeams,
  getTeamsManagers,
  getUsers,
  joinMapathon,
  promoteParticipant,
  removeManager,
  removeParticipant,
  removeTeam,
  setEditIsVisible,
  setErrors,
  setLocationCoordinates
} from './actions'
import mapathonSelector from './selector'

const mapStateToProps = createStructuredSelector({
  loadingMapathon: mapathonSelector('loadingMapathon'),
  mapathon: mapathonSelector('mapathon'),
  poster: mapathonSelector('poster'),
  notificationMessage: mapathonSelector('notificationMessage'),
  sendingRequest: appSelector('sendingRequest'),
  isAuthenticated: appSelector('isAuthenticated'),
  userData: appSelector('userData'),
  editIsVisible: mapathonSelector('editIsVisible'),
  errors: mapathonSelector('errors'),
  loadingUsers: mapathonSelector('loadingUsers'),
  users: mapathonSelector('users'),
  loadingTeamsManagers: mapathonSelector('loadingTeamsManagers'),
  teamsManagers: mapathonSelector('teamsManagers'),
  loadingTeams: mapathonSelector('loadingTeams'),
  teams: mapathonSelector('teams')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getMapathon: () => {
    dispatch(getMapathon(ownProps.match.params.mapathonId))
  },
  clearState: () => {
    dispatch(clearState())
  },
  clearErrors: () => {
    dispatch(clearErrors())
  },
  setNotificationMessage: notificationMessage => {
    dispatch(setNotificationMessage(notificationMessage))
    if (notificationMessage) dispatch(setNotificationIsVisible(true))
    else dispatch(setNotificationIsVisible(false))
  },
  createPoster: data => {
    dispatch(createPoster(data))
  },
  deletePoster: () => {
    dispatch(deletePoster())
  },
  joinMapathon: (mapathonId, userId) => {
    dispatch(joinMapathon(mapathonId, userId))
  },
  showEditMapathon: () => {
    dispatch(setEditIsVisible(true))
  },
  clearError: key => {
    dispatch(setErrors(key, ''))
  },
  setLocationCoordinates: event => {
    dispatch(
      setLocationCoordinates({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
    )
  },
  removeManager: (mapathonId, userId) => {
    dispatch(removeManager(mapathonId, userId))
  },
  promoteParticipant: (mapathonId, userId) => {
    dispatch(promoteParticipant(mapathonId, userId))
  },
  removeParticipant: (mapathonId, userId) => {
    dispatch(removeParticipant(mapathonId, userId))
  },
  removeTeam: (mapathonId, teamId) => {
    dispatch(removeTeam(mapathonId, teamId))
  },
  clearInvitationsState: () => {
    dispatch(clearInvitationsState())
  },
  getTeams: keywords => {
    dispatch(getTeams(keywords))
  },
  getTeamsManagers: keywords => {
    dispatch(getTeamsManagers(keywords))
  },
  getUsers: keywords => {
    dispatch(getUsers(keywords))
  },
  invite: (id, petitionType) => {
    dispatch(createPetition(id, petitionType))
  },
  hideEditMapathon: () => {
    dispatch(setEditIsVisible(false))
  },
  editMapathon: (mapathonId, data) => {
    let mapathonPoster = ''
    if (data.poster && !data.poster.startsWith('https://')) {
      mapathonPoster = data.poster
    }

    const mapathonData = {
      address: data.address,
      description: data.description,
      endDate: data.endDate || '',
      isOpen: data.isOpen,
      name: data.name,
      participantsGoal: data.participantsGoal
        ? Number(data.participantsGoal)
        : null,
      poster: mapathonPoster,
      reviewsGoal: data.reviewsGoal ? Number(data.reviewsGoal) : null,
      startDate: data.startDate || '',
      teamManager: data.teamManager
    }

    dispatch(editMapathon(mapathonId, mapathonData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Mapathon)
