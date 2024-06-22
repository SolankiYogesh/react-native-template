/* eslint-disable no-console */

import axios, {AxiosRequestConfig, AxiosRequestHeaders} from 'axios'

import Config from '@/config/Config'
import Constant from '@/Helpers/Constant'

type Methodtype = 'post' | 'get' | 'put' | 'delete'


export const getHeaders = (isFormData = false) => {
  return {
    accept: 'application/json',
    'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    'X-CSRFTOKEN': 'X-CSRFTOKEN: BFQcYOCNH7nZCRRbhEg8MzRWpLg6O1ThL0fiW6mbzSfs78qQExca0UrnBoXRyl1M'
  }
}

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL
})

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {


    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(
  (config) => {
    const tempConfig = config
    const {token} = Constant

    if (token) {
      config.headers = {
        ...config?.headers,
        Authorization: `Bearer ${token}`
      } as unknown as AxiosRequestHeaders
    }

    return tempConfig
  },
  async (error) => Promise.reject(error)
)

const getFormData = (object: Record<string, unknown>): FormData => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => formData.append(key, String(object[key])))
  return formData
}

const APICall = async <T>(
  method: Methodtype,
  body: any,
  url: string | null = null,
  headers: any = {},
  formData = false
) => {
  const config: AxiosRequestConfig = {
    method
  }
  if (url) {
    config.url = url
  }
  if (body && method === 'get') {
    config.params = body
  } else if (body && (method === 'post' || method === 'put') && formData) {
    config.data = getFormData(body)
    config.headers = {'Content-Type': 'multipart/form-data'}
  } else {
    config.data = body
  }

  if (headers) {
    config.headers = headers
  }

  return new Promise<ResponseTypeAXIOS<T>>((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        console.log('success', '<=======API Response======>', {
          status: res.status,
          data: res.data
        })
        return resolve({status: res.status, data: res.data})
      })
      .catch((error) => {
        return resolve(error?.response)
      })
  })
}

export default APICall
