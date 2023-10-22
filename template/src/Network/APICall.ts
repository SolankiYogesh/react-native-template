/* eslint-disable no-console */
import Axios from 'axios'

import AppConfig from './AppConfig'
import EndPoints from './EndPoints'

type methodtype = 'post' | 'get' | 'put' | 'delete'

export const getHeaders = (isFormdata = false) => {
  return {
    accept: 'application/json',
    'Content-Type': isFormdata ? 'multipart/form-data' : 'application/json',
    'X-CSRFTOKEN': 'X-CSRFTOKEN: BFQcYOCNH7nZCRRbhEg8MzRWpLg6O1ThL0fiW6mbzSfs78qQExca0UrnBoXRyl1M'
  }
}
const axiosInstance = Axios.create({
  baseURL: AppConfig.API_URL
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers = config?.headers
    return config
  },
  (error) => {
    console.log('axios request error =>', error)

    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (config) => {
    console.log('axios response =>', config)
    return config
  },
  (error) => {
    console.log('axios response error =>!', error.response || error)

    return Promise.reject(error)
  }
)

const getFormData = (object: any) => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => formData.append(key, object[key]))
  return formData
}

const APICall = async (
  method: methodtype = 'post',
  body: any,
  url = '',
  headers = {},
  formData = false
) => {
  const config: any = {
    method: method.toString(),
    timeout: 1000 * 60 * 2
  }
  if (url) {
    config.url = url
  }
  if (body && method === 'get') {
    config.params = body
  } else if (body && (method === 'post' || method === 'put') && formData) {
    config.data = getFormData(body)
  } else {
    config.data = body
  }

  config.headers = getHeaders(formData)
  if (headers && typeof headers === 'string') {
    config.headers = {Authorization: 'Bearer ' + headers || ' ', ...getHeaders(formData)}
  }

  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => resolve({status: res.status, data: res.data}))
      .catch(async (error) => {
        if (error?.response?.status === 500) {
          reject(error?.response)
        } else {
          resolve(error?.response)
        }
      })
  })
}

export default APICall
