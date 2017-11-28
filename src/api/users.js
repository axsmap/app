import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL

async function handleApiCall({ method, url, data, params }) {
  let response
  try {
    response = await axios({ method, url, data, params, timeout: 10000 })
  } catch (error) {
    throw error
  }

  return response
}

export async function getProfileEndpoint() {
  return handleApiCall({ method: 'get', url: `${apiURL}/users/profile` })
}
