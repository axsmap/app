import generateInstance from './axios-instance'

const apiURL = process.env.REACT_APP_API_URL

async function handleApiCall(axiosMethod, endpointURL, params) {
  let response
  try {
    if (params === undefined) response = await axiosMethod(endpointURL)
    else response = await axiosMethod(endpointURL, params, { timeout: 10000 })
  } catch (error) {
    throw error
  }

  return response
}

export async function facebookAuthEndpoint(code) {
  return handleApiCall(generateInstance().post, `${apiURL}/auth/facebook`, {
    code
  })
}

export async function googleAuthEndpoint(code) {
  return handleApiCall(generateInstance().post, `${apiURL}/auth/google`, {
    code
  })
}

export async function forgottenPasswordEndpoint(email) {
  return handleApiCall(
    generateInstance().post,
    `${apiURL}/auth/forgotten-password`,
    {
      email
    }
  )
}

export async function generateTokenEndpoint(key) {
  return handleApiCall(
    generateInstance().post,
    `${apiURL}/auth/generate-token`,
    { key }
  )
}

export async function resetPasswordEndpoint(key, password) {
  return handleApiCall(
    generateInstance().put,
    `${apiURL}/auth/reset-password`,
    {
      key,
      password
    }
  )
}

export async function signInEndpoint(email, password) {
  return handleApiCall(generateInstance().post, `${apiURL}/auth/sign-in`, {
    email,
    password
  })
}

export async function signOutEndpoint() {
  return handleApiCall(generateInstance().delete, `${apiURL}/auth/sign-out`)
}

export async function signUpEndpoint(
  email,
  firstName,
  isSubscribed,
  lastName,
  password
) {
  return handleApiCall(generateInstance().post, `${apiURL}/auth/sign-up`, {
    email,
    firstName,
    isSubscribed,
    lastName,
    password
  })
}
