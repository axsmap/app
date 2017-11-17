import axios from 'axios'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

export async function getLocationEndpoint() {
  let response

  try {
    response = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
      {},
      {
        timeout: 10000
      }
    )
  } catch (err) {
    throw err
  }

  const { location } = response.data
  return { lat: location.lat, lng: location.lng }
}
