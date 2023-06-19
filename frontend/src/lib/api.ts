import axios, { AxiosResponse } from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8081"
})
api.interceptors.response.use((response: AxiosResponse) => {
  return response.data
})
