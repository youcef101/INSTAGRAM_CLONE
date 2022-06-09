import axios from 'axios'
const baseURL = 'https://instagram-clone-deploy.herokuapp.com/api'
const axiosInstance = axios.create({
    baseURL: baseURL,
})
export default axiosInstance