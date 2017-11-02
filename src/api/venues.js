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
  keyword,
  location,
  bathroomScore,
  entryScore,
  guideDog,
  language,
  parking,
  quiet,
  ramp,
  secondEntry,
  spacious,
  steps,
  type,
  wellLit,
  page
}) {
  const params = {}
  params.keyword = keyword
  params.location = location
  params.bathroomScore = bathroomScore
  params.entryScore = entryScore
  params.guideDog = guideDog
  params.language = language
  params.parking = parking
  params.quiet = quiet
  params.ramp = ramp
  params.secondEntry = secondEntry
  params.spacious = spacious
  params.steps = steps
  params.type = type === 'all' ? '' : type
  params.wellLit = wellLit
  params.page = page

  let response
  try {
    response = await axios.get(`${apiUrl}/venues`, { params })
  } catch (error) {
    throw error
  }

  return { results: response.data.results, nextPage: response.data.nextPage }
}
