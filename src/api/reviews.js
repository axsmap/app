import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

async function handleApiCall({ method, url, data, params }) {
  let response
  try {
    response = await axios({ method, url, data, params, timeout: 10000 })
  } catch (error) {
    throw error
  }

  return response
}

export async function createReviewEndpoint(data) {
  return handleApiCall({ method: 'post', url: `${apiUrl}/reviews`, data })
}
