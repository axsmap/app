import handleEndpoint from './handle-endpoint'

export async function contactEndpoint(data) {
  return handleEndpoint({ method: 'post', url: '/contact', data })
}

export async function placeAutocompleteEndpoint(data) {
  return handleEndpoint({ method: 'post', url: '/place-autocomplete', data })
}

export async function reverseGeocodeEndpoint(data) {
  return handleEndpoint({ method: 'post', url: '/reverse-geocode', data })
}
