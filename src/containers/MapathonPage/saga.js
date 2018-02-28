import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest, setUserData } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import appSelector from '../App/selector'
import {
  editMapathonEndpoint,
  getMapathonEndpoint,
  joinMapathonEndpoint
} from '../../api/mapathons'
import { createPetitionEndpoint } from '../../api/petitions'
import { getTeamsEndpoint } from '../../api/teams'
import { getUsersEndpoint } from '../../api/users'

import {
  setEditIsVisible,
  setErrors,
  setLoadingMapathon,
  setLoadingTeams,
  setLoadingTeamsManagers,
  setLoadingUsers,
  setMapathon,
  setNotificationMessage,
  setTeams,
  setTeamsManagers,
  setUsers
} from './actions'
import {
  CREATE_PETITION,
  EDIT_MAPATHON,
  GET_MAPATHON,
  GET_TEAMS,
  GET_TEAMS_MANAGERS,
  GET_USERS,
  JOIN_MAPATHON,
  PROMOTE_PARTICIPANT,
  REMOVE_MANAGER,
  REMOVE_PARTICIPANT,
  REMOVE_TEAM
} from './constants'
import mapathonSelector from './selector'

function* showNotificationError(message) {
  yield put(setNotificationType('error'))
  yield put(setNotificationMessage(message))
  yield put(setNotificationIsVisible(true))
  yield put(finishProgress())
  yield put(setSendingRequest(false))
}

function* getMapathonFlow(params) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let response
  try {
    response = yield call(getMapathonEndpoint, params.mapathonId)
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      yield showNotificationError('timeoutError')
    } else if (error.response.status === 500) {
      yield showNotificationError('serverError')
    } else if (error.response.data.general === 'Event not found') {
      yield showNotificationError('notFoundError')
    }

    yield put(setLoadingMapathon(false))
    return
  }

  yield put(setMapathon(response.data))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingMapathon(false))
}

function* joinMapathonFlow({ mapathonId, userId }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  const data = { userId }
  let response
  try {
    response = yield call(joinMapathonEndpoint, mapathonId, data)
  } catch (err) {
    yield put(setNotificationType('error'))
    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('serverError'))
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('blockedError'))
    } else if (
      err.response.data.general ===
      'You already are a participant in this event'
    ) {
      yield put(setNotificationMessage('alreadyParticipantError'))
    } else if (
      err.response.data.general ===
      'You already have a pending petition with this event'
    ) {
      yield put(setNotificationMessage('alreadyPendingRequestError'))
    } else if (
      err.response.data.general === 'This event has already finished'
    ) {
      yield put(setNotificationMessage('alreadyFinishedEventError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationType('success'))
  if (response.data.general === 'Joined') {
    const userData = yield select(appSelector('userData'))
    const mapathon = yield select(mapathonSelector('mapathon'))

    const userEvents = [
      ...userData.events,
      {
        id: mapathon.id,
        name: mapathon.name,
        poster: mapathon.poster
      }
    ]
    yield put(setUserData({ ...userData, events: userEvents }))

    const mapathonParticipants = [
      ...mapathon.participants,
      {
        id: userData.id,
        avatar: userData.avatar,
        firstName: userData.firstName,
        lastName: userData.lastName
      }
    ]
    yield put(setMapathon({ ...mapathon, participants: mapathonParticipants }))

    yield put(setNotificationMessage('joinedSuccess'))
  } else {
    yield put(setNotificationMessage('requestedSuccess'))
  }
  yield put(setNotificationIsVisible(true))
}

function* editMapathonFlow({ mapathonId, data }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  try {
    yield call(editMapathonEndpoint, mapathonId, data)
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      yield showNotificationError('timeoutError')
      return
    } else if (err.response.status === 500) {
      yield showNotificationError('serverError')
      return
    } else if (err.response.status === 401) {
      yield put(finishProgress())
      yield put(setSendingRequest(false))
      return
    } else if (err.response.status === 423) {
      yield showNotificationError('blockedError')
      return
    } else if (err.response.status === 403) {
      yield showNotificationError('forbiddenError')
      return
    } else if (
      err.response.data.managers === 'Should not remove all managers'
    ) {
      yield showNotificationError('removeManagersError')
      return
    }

    const errors = err.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setEditIsVisible(false))
  yield put(setLoadingMapathon(true))
  yield call(getMapathonFlow, { mapathonId })
}

function* removeManagerFlow({ mapathonId, userId }) {
  const mapathon = yield select(mapathonSelector('mapathon'))
  const managers = mapathon.managers.map(m => {
    let id = m.id
    if (m.id === userId) {
      id = `-${m.id}`
    }
    return id
  })

  const data = { managers }
  yield call(editMapathonFlow, { mapathonId, data })
}

function* promoteParticipantFlow({ mapathonId, userId }) {
  const mapathon = yield select(mapathonSelector('mapathon'))
  const data = { managers: [...mapathon.managers.map(m => m.id), userId] }
  yield call(editMapathonFlow, { mapathonId, data })
}

function* removeParticipantFlow({ mapathonId, userId }) {
  const data = { participants: [`-${userId}`] }
  yield call(editMapathonFlow, { mapathonId, data })
}

function* removeTeamFlow({ mapathonId, teamId }) {
  const data = { teams: [`-${teamId}`] }
  yield call(editMapathonFlow, { mapathonId, data })
}

function* getTeamsFlow({ keywords }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))
  yield put(setLoadingTeams(true))

  const params = {
    keywords,
    page: 1,
    pageLimit: 5
  }

  let response
  try {
    response = yield call(getTeamsEndpoint, params)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setTeams([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeams(false))
    return
  }

  if (response.data.results.length === 0) {
    yield put(setTeams([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeams(false))
    return
  }

  const teams = response.data.results.slice(0, 5).map(t => ({
    id: t.id,
    avatar: t.avatar,
    name: t.name
  }))
  yield put(setTeams(teams))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingTeams(false))
}

function* getTeamsManagersFlow({ keywords }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))
  yield put(setLoadingTeamsManagers(true))

  const params = {
    keywords,
    managed: 1,
    page: 1,
    pageLimit: 5
  }

  let response
  try {
    response = yield call(getTeamsEndpoint, params)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setTeamsManagers([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeamsManagers(false))
    return
  }

  if (response.data.results.length === 0) {
    yield put(setTeamsManagers([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeamsManagers(false))
    return
  }

  const teamsManagers = response.data.results.map(t => ({
    id: t.id,
    avatar: t.avatar,
    name: t.name
  }))
  yield put(setTeamsManagers(teamsManagers))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingTeamsManagers(false))
}

function* getUsersFlow({ keywords }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))
  yield put(setLoadingUsers(true))

  const params = {
    keywords,
    page: 1,
    pageLimit: 5
  }

  let response
  try {
    response = yield call(getUsersEndpoint, params)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setUsers([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingUsers(false))
    return
  }

  if (response.data.results.length === 0) {
    yield put(setUsers([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingUsers(false))
    return
  }

  const users = response.data.results.slice(0, 5).map(u => ({
    id: u.id,
    avatar: u.avatar,
    firstName: u.firstName,
    lastName: u.lastName,
    username: u.username
  }))
  yield put(setUsers(users))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingUsers(false))
}

function* createPetitionFlow({ id, petitionType }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  const mapathon = yield select(mapathonSelector('mapathon'))
  let data
  if (petitionType === 'user-event') {
    data = { event: mapathon.id, type: 'invite-user-event', user: id }
  } else if (petitionType === 'team-event') {
    data = { event: mapathon.id, type: 'invite-team-event', team: id }
  }
  try {
    yield call(createPetitionEndpoint, data)
  } catch (err) {
    yield put(setNotificationType('error'))
    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('serverError'))
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('blockedError'))
    } else if (err.response.data.general === 'User should not be you') {
      yield put(setNotificationMessage('sameUserError'))
    } else if (
      err.response.data.general ===
      'User already has a pending invitation to event'
    ) {
      yield put(setNotificationMessage('alreadyPendingUserError'))
    } else if (
      err.response.data.general ===
      'Team already has a pending invitation to event'
    ) {
      yield put(setNotificationMessage('alreadyPendingTeamError'))
    } else if (
      err.response.data.general === 'User is already participant of event'
    ) {
      yield put(setNotificationMessage('alreadyUserParticipantError'))
    } else if (
      err.response.data.general === 'Team is already participant of event'
    ) {
      yield put(setNotificationMessage('alreadyTeamParticipantError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('invitationSuccess'))
  yield put(setNotificationIsVisible(true))
}

export default function* mapathonSaga() {
  yield takeLatest(GET_MAPATHON, getMapathonFlow)
  yield takeLatest(JOIN_MAPATHON, joinMapathonFlow)
  yield takeLatest(EDIT_MAPATHON, editMapathonFlow)
  yield takeLatest(REMOVE_MANAGER, removeManagerFlow)
  yield takeLatest(PROMOTE_PARTICIPANT, promoteParticipantFlow)
  yield takeLatest(REMOVE_PARTICIPANT, removeParticipantFlow)
  yield takeLatest(REMOVE_TEAM, removeTeamFlow)
  yield takeLatest(GET_TEAMS, getTeamsFlow)
  yield takeLatest(GET_TEAMS_MANAGERS, getTeamsManagersFlow)
  yield takeLatest(GET_USERS, getUsersFlow)
  yield takeLatest(CREATE_PETITION, createPetitionFlow)
}
