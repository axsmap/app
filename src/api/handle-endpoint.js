/* eslint-disable no-param-reassign */

import axios from 'axios'

const apiBaseUrl = process.env.REACT_APP_API_URL

export default (async function handleEndpoint({ method, url, data, params }) {
  let response
  url = url.startsWith('/') ? `${apiBaseUrl}${url}` : url
  try {
    response = await axios({
      method,
      url,
      data,
      params,
      timeout: 10000
    })
  } catch (error) {
    throw error
  }

  return response
})
