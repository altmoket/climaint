import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000/data'

const axiosInstance = axios.create({baseURL: baseURL})

export default axiosInstance