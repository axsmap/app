import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL

const generateInstance = () => {
  const token = localStorage.getItem('token')

  const axiosInstance = axios.create({
    baseURL: `${apiURL}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        document.location = '/sign-in'
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export default generateInstance
