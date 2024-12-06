import axios from "axios";
// export const url = ''
export const url = 'http://localhost:4000/internal'; // https://feerverk.by/internal
export const redirect = 'https://feerverk.by'; // https://www.youtube.com/watch?v=3ABzKfLySb0
// ''
const instance = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json', },
})
instance.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
export default instance
