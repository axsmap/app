import axios from 'axios'

export default (async function handleApiCall({ method, url, data, params }) {
  let response
  try {
    response = await axios({ method, url, data, params, timeout: 10000 })
  } catch (error) {
    throw error
  }

  return response
})
