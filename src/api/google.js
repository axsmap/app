import generateInstance from './axios-instance'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

export async function getLocationEndpoint() {
  let response

  try {
    response = await generateInstance().post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`
    )
  } catch (err) {
    throw err
  }

  const { location } = response.data
  return { lat: location.lat, lng: location.lng }
}
