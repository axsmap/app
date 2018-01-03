import handleEndpoint from './handle-endpoint'

export async function getTeamsEndpoint(params) {
  return handleEndpoint({ method: 'get', url: '/teams', params })
}
