import { last } from 'lodash'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { createPetitionEndpoint } from '../../api/petitions'
import { createPhotoEndpoint, deletePhotoEndpoint } from '../../api/photos'
import appSelector from '../App/selector'
import {
  editTeamEndpoint,
  getTeamEndpoint,
  joinTeamEndpoint
} from '../../api/teams'
import { getUsersEndpoint } from '../../api/users'

import {
  setAvatar,
  setEditIsVisible,
  setErrors,
  setLoadingTeam,
  setLoadingUsers,
  setTeam,
  setUsers
} from './actions'
import {
  CREATE_AVATAR,
  CREATE_PETITION,
  DELETE_AVATAR,
  EDIT_TEAM,
  GET_TEAM,
  GET_USERS,
  JOIN_TEAM,
  PROMOTE_MEMBER,
  REMOVE_MANAGER,
  REMOVE_MEMBER
} from './constants'
import teamSelector from './selector'

function* getTeamFlow(params) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let response
  try {
    response = yield call(getTeamEndpoint, params.teamId)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Team.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Team.serverError'))
    } else if (err.response.data.general === 'Team not found') {
      yield put(setNotificationMessage('axsmap.components.Team.notFoundError'))
    }

    yield put(setNotificationIsVisible(true))

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    yield put(setLoadingTeam(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setTeam(response.data))
  yield put(setAvatar(response.data.avatar))
  yield put(setLoadingTeam(false))
}

function* joinTeamFlow({ teamId, userId }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  const data = { userId }
  try {
    yield call(joinTeamEndpoint, teamId, data)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Team.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Team.serverError'))
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('axsmap.components.Team.blockedError'))
    } else if (
      err.response.data.general === 'You already are a member in this team'
    ) {
      yield put(
        setNotificationMessage('axsmap.components.Team.alreadyUserMemberError')
      )
    } else if (
      err.response.data.general ===
      'You already have a pending petition with this team'
    ) {
      yield put(
        setNotificationMessage(
          'axsmap.components.Team.alreadyPendingRequestError'
        )
      )
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('axsmap.components.Team.requestedSuccess'))
  yield put(setNotificationIsVisible(true))
}

function* createAvatarFlow({ data }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  let response
  try {
    response = yield call(createPhotoEndpoint, data)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Team.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Team.serverError'))
    }

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setAvatar(response.data.url))

  const team = yield select(teamSelector('team'))

  try {
    yield call(editTeamEndpoint, team.id, { avatar: response.data.url })
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Team.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Team.serverError'))
    } else if (err.response.status === 401) {
      yield put(finishProgress())
      yield put(setSendingRequest(false))
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('axsmap.components.Team.blockedError'))
    } else if (err.response.status === 403) {
      yield put(setNotificationMessage('axsmap.components.Team.forbiddenError'))
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))
}

function* deleteAvatarFlow() {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const avatar = yield select(teamSelector('avatar'))
  const avatarFileName = last(avatar.split('/'))

  try {
    yield call(deletePhotoEndpoint, avatarFileName)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Team.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Team.serverError'))
    }

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setAvatar(''))

  const team = yield select(teamSelector('team'))

  try {
    yield call(editTeamEndpoint, team.id, { avatar: '' })
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Team.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Team.serverError'))
    } else if (err.response.status === 401) {
      yield put(finishProgress())
      yield put(setSendingRequest(false))
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('axsmap.components.Team.blockedError'))
    } else if (err.response.status === 403) {
      yield put(setNotificationMessage('axsmap.components.Team.forbiddenError'))
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))
}

function* editTeamFlow({ teamId, data }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  const avatar = yield select(teamSelector('avatar'))
  const teamManagers = data.managers ? data.managers.map(m => m.id) : []
  const teamMembers = data.members ? data.members.map(m => m.id) : []

  const teamData = {
    avatar,
    description: data.description,
    name: data.name,
    managers: teamManagers,
    members: teamMembers
  }

  try {
    yield call(editTeamEndpoint, teamId, teamData)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Team.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Team.serverError'))
    } else if (err.response.status === 401) {
      yield put(finishProgress())
      yield put(setSendingRequest(false))
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('axsmap.components.Team.blockedError'))
    } else if (err.response.status === 403) {
      yield put(setNotificationMessage('axsmap.components.Team.forbiddenError'))
    } else if (
      err.response.data.managers === 'Should not remove all managers'
    ) {
      yield put(
        setNotificationMessage('axsmap.components.Team.removeManagersError')
      )
    } else if (err.response.status === 400) {
      yield put(setNotificationMessage('axsmap.components.Team.inputError'))
    }

    yield put(setNotificationIsVisible(true))

    const errors = err.response.data
    if (errors) {
      yield all(
        Object.keys(errors).map(key => put(setErrors(key, errors[key])))
      )
    }

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('axsmap.components.Team.success'))
  yield put(setNotificationIsVisible(true))

  yield put(setEditIsVisible(false))
  yield put(setLoadingTeam(true))
  yield call(getTeamFlow, {
    teamId
  })
}

function* removeManagerFlow({ teamId, userId }) {
  const team = yield select(teamSelector('team'))
  const managers = team.managers.map(m => {
    let id = m.id
    if (m.id === userId) {
      id = `-${m.id}`
    }
    return Object.assign({}, m, { id })
  })
  const data = { managers }
  yield call(editTeamFlow, { teamId, data })
}

function* promoteMemberFlow({ teamId, userId }) {
  const team = yield select(teamSelector('team'))
  const managers = [...team.managers, { id: userId }]
  const data = { managers }
  yield call(editTeamFlow, { teamId, data })
}

function* removeMemberFlow({ teamId, userId }) {
  const members = [
    {
      id: `-${userId}`
    }
  ]
  const data = { members }
  yield call(editTeamFlow, { teamId, data })
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
      yield put(setNotificationMessage('axsmap.components.Team.timeoutError'))
    } else {
      yield put(setNotificationMessage('axsmap.components.Team.serverError'))
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    yield put(setUsers([]))
    yield put(setLoadingUsers(false))

    return
  }

  if (response.data.results.length === 0) {
    yield put(finishProgress())
    yield put(setSendingRequest(false))

    yield put(setUsers([]))
    yield put(setLoadingUsers(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  const users = response.data.results.slice(0, 5).map(u => ({
    id: u.id,
    avatar: u.avatar,
    firstName: u.firstName,
    lastName: u.lastName,
    username: u.username
  }))
  yield put(setUsers(users))
  yield put(setLoadingUsers(false))
}

function* createPetitionFlow({ userId }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  const team = yield select(teamSelector('team'))
  const data = { team: team.id, type: 'invite-user-team', user: userId }
  try {
    yield call(createPetitionEndpoint, data)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Team.timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Team.serverError'))
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('axsmap.components.Team.blockedError'))
    } else if (err.response.data.general === 'User should not be you') {
      yield put(setNotificationMessage('axsmap.components.Team.sameUserError'))
    } else if (
      err.response.data.general ===
      'User already has a pending invitation to team'
    ) {
      yield put(
        setNotificationMessage('axsmap.components.Team.alreadyPendingError')
      )
    } else if (err.response.data.general === 'User is already member of team') {
      yield put(
        setNotificationMessage('axsmap.components.Team.alreadyMemberError')
      )
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('axsmap.components.Team.invitationSuccess'))
  yield put(setNotificationIsVisible(true))
}

export default function* teamSaga() {
  yield takeLatest(GET_TEAM, getTeamFlow)
  yield takeLatest(JOIN_TEAM, joinTeamFlow)
  yield takeLatest(CREATE_AVATAR, createAvatarFlow)
  yield takeLatest(DELETE_AVATAR, deleteAvatarFlow)
  yield takeLatest(EDIT_TEAM, editTeamFlow)
  yield takeLatest(REMOVE_MANAGER, removeManagerFlow)
  yield takeLatest(PROMOTE_MEMBER, promoteMemberFlow)
  yield takeLatest(REMOVE_MEMBER, removeMemberFlow)
  yield takeLatest(GET_USERS, getUsersFlow)
  yield takeLatest(CREATE_PETITION, createPetitionFlow)
}
