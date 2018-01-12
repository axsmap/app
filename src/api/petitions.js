import handleEndpoint from './handle-endpoint'

export async function createPetitionEndpoint(data) {
  return handleEndpoint({ method: 'post', url: '/petitions', data })
}
