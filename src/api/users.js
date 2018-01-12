import handleEndpoint from './handle-endpoint'

export async function getUsersEndpoint(params) {
  return handleEndpoint({ method: 'get', url: '/users', params })
}

export async function getProfileEndpoint() {
  return handleEndpoint({ method: 'get', url: '/users/profile' })
}
