import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL

export async function facebookAuthEndpoint(accessToken) {
  let response

  try {
    response = await axios.post(`${apiURL}/auth/facebook`, { accessToken })
  } catch (error) {
    throw error
  }

  return response
}

export async function googleAuthEndpoint(code) {
  let response

  try {
    response = await axios.post(`${apiURL}/auth/google`, { code })
  } catch (error) {
    throw error
  }

  return response
}

export async function forgottenPasswordEndpoint(email) {
  let response

  try {
    response = await axios.post(`${apiURL}/auth/forgotten-password`, { email })
  } catch (error) {
    throw error
  }

  return response
}

export async function generateTokenEndpoint(key) {
  let response

  try {
    response = await axios.post(`${apiURL}/auth/generate-token`, { key })
  } catch (error) {
    throw error
  }

  return response
}

export async function resetPasswordEndpoint(key, password) {
  let response

  try {
    response = await axios.put(`${apiURL}/auth/reset-password`, {
      key,
      password
    })
  } catch (error) {
    throw error
  }

  return response
}

export async function signInEndpoint(email, password) {
  let response

  try {
    response = await axios.post(`${apiURL}/auth/sign-in`, {
      email,
      password
    })
  } catch (error) {
    throw error
  }

  return response
}

export async function signOutEndpoint() {
  let response

  try {
    response = await axios.delete(`${apiURL}/auth/sign-out`)
  } catch (error) {
    throw error
  }

  return response
}

export async function signUpEndpoint(
  email,
  firstName,
  isSubscribed,
  lastName,
  password
) {
  let response

  try {
    response = await axios.post(`${apiURL}/auth/sign-up`, {
      email,
      firstName,
      isSubscribed,
      lastName,
      password
    })
  } catch (error) {
    throw error
  }

  return response
}
