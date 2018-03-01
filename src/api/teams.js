import handleEndpoint from './handle-endpoint'

export async function getTeamsEndpoint(params) {
  return handleEndpoint({ method: 'get', url: '/teams', params })
}

export async function createTeamEndpoint(data) {
  return handleEndpoint({ method: 'post', url: '/teams', data })
}

export async function getTeamEndpoint(teamId) {
  return handleEndpoint({ method: 'get', url: `/teams/${teamId}` })
}

export async function editTeamEndpoint(teamId, data) {
  return handleEndpoint({ method: 'put', url: `/teams/${teamId}`, data })
}

export async function joinTeamEndpoint(teamId, data) {
  return handleEndpoint({
    method: 'post',
    url: `/teams/${teamId}/join`,
    data
  })
}
