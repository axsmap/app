import handleEndpoint from './handle-endpoint'

export async function facebookAuthEndpoint(code) {
  return handleEndpoint({
    method: 'post',
    url: `/auth/facebook`,
    data: { code }
  })
}

export async function googleAuthEndpoint(code) {
  return handleEndpoint({
    method: 'post',
    url: '/auth/google',
    data: { code }
  })
}

export async function forgottenPasswordEndpoint(email) {
  return handleEndpoint({
    method: 'post',
    url: '/auth/forgotten-password',
    data: { email }
  })
}

export async function generateTokenEndpoint(key) {
  return handleEndpoint({
    method: 'post',
    url: '/auth/generate-token',
    data: { key }
  })
}

export async function resetPasswordEndpoint(key, password) {
  return handleEndpoint({
    method: 'put',
    url: '/auth/reset-password',
    data: { key, password }
  })
}

export async function signInEndpoint(email, password) {
  return handleEndpoint({
    method: 'post',
    url: '/auth/sign-in',
    data: { email, password }
  })
}

export async function signOutEndpoint() {
  return handleEndpoint({
    method: 'delete',
    url: '/auth/sign-out'
  })
}

export async function signUpEndpoint(
  email,
  firstName,
  isSubscribed,
  lastName,
  password
) {
  return handleEndpoint({
    method: 'post',
    url: '/auth/sign-up',
    data: { email, firstName, isSubscribed, lastName, password }
  })
}
