import axios, { AxiosRequestConfig } from 'axios'

export default function baseAPI(rest: AxiosRequestConfig) {
  const config: AxiosRequestConfig = {
    baseURL: process.env.API_URL,
    ...rest,
  }

  return axios(config)
}
