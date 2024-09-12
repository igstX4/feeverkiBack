import axios from "axios";
export const url = 'http://feerverk.by/internal'
// export const url = 'http://localhost:4000/internal';
export const redirect = 'http://localhost:3000';

const instance = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json', },
})
instance.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
export default instance
