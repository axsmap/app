import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL

export async function archiveUserEndpoint(userId) {
  let response

  try {
    response = await axios.put(`${apiURL}/users/${userId}/archive`)
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
  userId,
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
    response = await axios.put(`${apiURL}/users/${userId}`, {
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

export async function getUserEndpoint(userId) {
  let response

  try {
    response = await axios.get(`${apiURL}/users/${userId}`)
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

export async function uploadUserAvatarEndpoint(userId, avatar) {
  let response

  try {
    response = await axios.put(`${apiURL}/users/${userId}/avatar`, { avatar })
  } catch (error) {
    throw error
  }

  return response
}
