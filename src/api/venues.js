import axios from 'axios'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
const apiUrl = process.env.REACT_APP_API_URL

export async function getIPLocationEndpoint() {
  let response

  try {
    response = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`
    )
  } catch (err) {
    throw err
  }

  const { location } = response.data
  return `${location.lat},${location.lng}`
}

export async function getVenuesEndpoint({
  location,
  keyword,
  type,
  language,
  page
}) {
  const params = {}
  if (page) {
    params.page = page
  } else {
    params.location = location
    params.keyword = keyword
    params.type = type === 'any' ? '' : type
    params.language = language
  }

  let response
  try {
    response = await axios.get(`${apiUrl}/venues`, { params })
  } catch (error) {
    throw error
  }

  return { results: response.data.results, nextPage: response.data.nextPage }
}
