import axiosInstance from "../axiosInstance"

const userService = () => {
  return {
    registerUser: async ({ username, email, password }) => {
      return axiosInstance
        .post('/api/Authenticate/register', { username: username, email: email, password: password })
        .then((response) => response.data)
    },

    loginUser: async ({ username, password }) => {
      return axiosInstance
        .post('api/Authenticate/login', { username: username, password: password })
        .then((response) => response.data)
    }
  }
}


export default userService