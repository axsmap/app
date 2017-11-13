import generateInstance from './axios-instance'

const apiUrl = process.env.REACT_APP_API_URL

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
    response = await generateInstance().get(`${apiUrl}/venues`, { params })
  } catch (error) {
    throw error
  }

  return { results: response.data.results, nextPage: response.data.nextPage }
}
