import handleApiCall from './handleApiCall'

const apiUrl = process.env.REACT_APP_API_URL

export async function getVenuesEndpoint(params) {
  return handleApiCall({ method: 'get', url: `${apiUrl}/venues`, params })
}

export async function getVenueEndpoint(placeId) {
  return handleApiCall({ method: 'get', url: `${apiUrl}/venues/${placeId}` })
}
