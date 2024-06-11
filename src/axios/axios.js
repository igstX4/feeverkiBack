import axios from "axios";
const url = 'https://fireworks-server-pmkqkxv6x-igstx4s-projects.vercel.app/internal'

const instance = axios.create({
    baseURL: url,
    headers: { Authorization: window.localStorage.getItem('token') },
})

export default instance