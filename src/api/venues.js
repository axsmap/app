import handleEndpoint from './handle-endpoint'

export async function getVenuesEndpoint(params) {
  return handleEndpoint({ method: 'get', url: '/venues', params })
}

export async function getVenueEndpoint(placeId) {
  return handleEndpoint({ method: 'get', url: `/venues/${placeId}` })
}
