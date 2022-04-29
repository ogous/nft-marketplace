import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export default function baseAPI<T>(config: AxiosRequestConfig) {
  const instance = axios.create()

  instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
    config.baseURL = process.env.API_URL
    return config
  })
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // do something

      return response
    },
    (error: AxiosError) => {
      APIErrorHandler({
        code: error.code,
        message: error.message,
        endPoint: error.config.url,
      })
    },
  )

  return instance(config).then((res: AxiosResponse<T>) => res.data)
}

interface IAPIErrorHandler {
  code?: string
  endPoint?: string
  message?: string
}

export function APIErrorHandler(err: IAPIErrorHandler) {
  console.log('API ERROR: ', err)
}
