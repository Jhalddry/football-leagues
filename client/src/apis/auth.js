import axios from './axios'

export const loginRequest = async(user) => axios.post('/login', user)
export const registerRequest = async(user) => axios.post('/register', user)
export const refresh = async() => axios.get('/refresh')