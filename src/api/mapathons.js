import handleEndpoint from './handle-endpoint'

export async function getMapathonsEndpoint(params) {
  return handleEndpoint({ method: 'get', url: '/events', params })
}

export async function createMapathonEndpoint(data) {
  return handleEndpoint({ method: 'post', url: '/events', data })
}
