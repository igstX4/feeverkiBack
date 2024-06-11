import axios from "axios";
const url = 'http://localhost:4000/internal'

const instance = axios.create({
    baseURL: url,
    headers: { Authorization: window.localStorage.getItem('token') },
})

export default instance