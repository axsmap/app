import handleEndpoint from './handle-endpoint'

export async function getProfileEndpoint() {
  return handleEndpoint({ method: 'get', url: '/users/profile' })
}
