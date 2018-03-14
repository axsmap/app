/* eslint-disable no-param-reassign */

import axios from 'axios'

const apiBaseUrl = process.env.REACT_APP_API_URL

export default (async function handleEndpoint({
  method,
  headers,
  url,
  data,
  params
}) {
  let response
  url = url.startsWith('/') ? `${apiBaseUrl}${url}` : url
  try {
    response = await axios({
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      url,
      data,
      params,
      timeout: 15000
    })
  } catch (error) {
    throw error
  }

  return response
})
