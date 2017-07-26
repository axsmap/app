import axios from 'axios'
import { delay } from 'redux-saga'

const apiURL = process.env.API_URL

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

export async function signUpEndpoint(email, firstName, lastName, password) {
  // let response

  // try {
  //   response = await axios.post(`${apiURL}/auth/sign-up`, {
  //     email,
  //     firstName,
  //     lastName,
  //     password
  //   })
  // } catch (error) {
  //   throw error
  // }

  // return response
  console.log(JSON.stringify({ email, firstName, lastName, password })) // eslint-disable-line

  await delay(1000)

  function MyError(message) {
    this.name = 'MyError'
    this.message = message || 'Default Message'
    this.response = {
      data: { message: 'Something went wrong' }
    }
    this.stack = new Error().stack
  }
  MyError.prototype = Object.create(Error.prototype)
  MyError.prototype.constructor = MyError

  throw new MyError()
  // return { message: 'Success' }
}
