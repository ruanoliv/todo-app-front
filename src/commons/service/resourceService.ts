import axios from 'axios'

interface RequestConfig {
  url?: string
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | string
  headers?: Record<string, string>
  data?: any
  responseType?: any
}

type Requests = Record<string, RequestConfig>

type Params = Record<string, any> | undefined
type Data = any

type ResourceFunction = (params?: Params, data?: Data) => Promise<any>

type Resource = Record<string, ResourceFunction>

const resourceService = (baseUrl: string, requests: Requests): Resource => {
  const resource: Resource = {}

  Object.keys(requests).forEach(key => {
    const request = requests[key]
    const url = request.url || ''
    const urlParams = String(url).match(/(?::)(\w+)/g) || []

    resource[key] = (params = {}, data) => {
      const newUrl = urlParams.reduce((newUrl, param) => {
        const paramKey = param.replace(/:/g, '')
        const paramValue = params[paramKey]
        return newUrl.replace(param, paramValue)
      }, url)

      const query = Object.keys(params).reduce((q, key) => {
        const isUrlParam = urlParams.findIndex(urlParam => key === urlParam.replace(/:/g, '')) !== -1

        if (!isUrlParam) {
          q[key] = params[key]
        }
        return q
      }, {} as Record<string, any>)

      let config: any = {
        method: request.method || 'get',
        url: `${baseUrl}${newUrl}`,
        params: query,
        headers: request.headers || {},
        data: data ? data : request.data ? request.data : undefined,
      }

      if (typeof data === 'object' && data !== null && 'extraURL' in data && data.extraURL) {
        config = {
          ...config,
          url: `${baseUrl}${newUrl}${data.value}`
        }
      }

      if (request.responseType) {
        config.responseType = request.responseType
      }

      return axios(config)
    }
  })

  return resource
}

export default resourceService
