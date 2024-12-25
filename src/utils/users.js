import axiosInstance from "../axiosInstance"

export const registerUser = async ({ username, email, password }) => {
  return axiosInstance
    .post('/api/Authenticate/register', { username: username, email: email, password: password })
}

export const loginUser = async ({ username, password }) => {
  return axiosInstance
    .post('api/Authenticate/login', { username: username, password: password })
}