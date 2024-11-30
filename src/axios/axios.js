import axios from "axios";
// export const url = ''
export const url = 'https://feerverk.by/internal';
export const redirect = 'https://feerverk.by'; // 

const instance = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json', },
})
instance.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
export default instance
