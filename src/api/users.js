import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL

export async function archiveUserEndpoint(userID) {
  let response

  try {
    response = await axios.put(`${apiURL}/users/${userID}/archive`)
  } catch (error) {
    throw error
  }

  return response
}

export async function changePasswordEndpoint(oldPassword, password) {
  let response

  try {
    response = await axios.put(`${apiURL}/users/password`, {
      oldPassword,
      password
    })
  } catch (error) {
    throw error
  }

  return response
}

export async function editUserEndpoint(
  userID,
  description,
  disabilities,
  firstName,
  gender,
  isSubscribed,
  lastName,
  phone,
  showDisabilities,
  showEmail,
  showPhone,
  username,
  zip
) {
  let response

  try {
    response = await axios.put(`${apiURL}/users/${userID}`, {
      description,
      disabilities,
      firstName,
      gender,
      isSubscribed,
      lastName,
      phone,
      showDisabilities,
      showEmail,
      showPhone,
      username,
      zip
    })
  } catch (error) {
    throw error
  }

  return response
}

export async function getUserEndpoint(userID) {
  let response

  try {
    response = await axios.get(`${apiURL}/users/${userID}`)
  } catch (error) {
    throw error
  }

  return response
}

export async function listUsersEndpoint(keywords, sortBy, page) {
  let response

  try {
    response = await axios.get(`${apiURL}/users`, {
      params: {
        keywords,
        sortBy,
        page
      }
    })
  } catch (error) {
    throw error
  }

  return response
}

export async function uploadUserAvatarEndpoint(userID, avatar) {
  let response

  try {
    response = await axios.put(`${apiURL}/users/${userID}/avatar`, { avatar })
  } catch (error) {
    throw error
  }

  return response
}
