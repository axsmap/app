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

export async function facebookAuthEndpoint(code) {
  return handleApiCall({
    method: 'post',
    url: `${apiURL}/auth/facebook`,
    data: { code }
  })
}

export async function googleAuthEndpoint(code) {
  return handleApiCall({
    method: 'post',
    url: `${apiURL}/auth/google`,
    data: { code }
  })
}

export async function forgottenPasswordEndpoint(email) {
  return handleApiCall({
    method: 'post',
    url: `${apiURL}/auth/forgotten-password`,
    data: { email }
  })
}

export async function generateTokenEndpoint(key) {
  return handleApiCall({
    method: 'post',
    url: `${apiURL}/auth/generate-token`,
    data: { key }
  })
}

export async function resetPasswordEndpoint(key, password) {
  return handleApiCall({
    method: 'put',
    url: `${apiURL}/auth/reset-password`,
    data: { key, password }
  })
}

export async function signInEndpoint(email, password) {
  return handleApiCall({
    method: 'post',
    url: `${apiURL}/auth/sign-in`,
    data: { email, password }
  })
}

export async function signOutEndpoint() {
  return handleApiCall({
    method: 'delete',
    url: `${apiURL}/auth/sign-out`
  })
}

export async function signUpEndpoint(
  email,
  firstName,
  isSubscribed,
  lastName,
  password
) {
  return handleApiCall({
    method: 'post',
    url: `${apiURL}/auth/sign-up`,
    data: { email, firstName, isSubscribed, lastName, password }
  })
}
