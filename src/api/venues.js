import generateInstance from './axios-instance'

const apiUrl = process.env.REACT_APP_API_URL

export async function getVenuesEndpoint(params) {
  let response
  try {
    response = await generateInstance().get(`${apiUrl}/venues`, { params })
  } catch (error) {
    throw error
  }

  return { results: response.data.results, nextPage: response.data.nextPage }
}
