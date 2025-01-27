import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

type RequestData = Record<string, unknown>
type RequestOptions = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>

type ApiError<T = unknown> = {
  status: number
  message: string
  data?: T
  code?: string
}

class HttpError<T = unknown> extends Error {
  data?: T
  constructor(public error: ApiError<T>) {
    super(error.message)
    this.name = 'HttpError'
    this.data = error.data
  }
}

function createApiClient() {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
  })

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<unknown>) => {
      if (
        error.response &&
        error.response?.status >= 400 &&
        error.response?.status < 500
      ) {
        throw new HttpError({
          status: error.response?.status ?? 500,
          message: error.message ?? 'An unexpected error occurred',
          data: error.response?.data,
          code: error.code,
        })
      }
    }
  )

  return client
}

const apiClient = createApiClient()

export async function get<TResponse>(
  url: string,
  options?: RequestOptions
): Promise<AxiosResponse<TResponse>> {
  return apiClient.get<TResponse>(url, options)
}

export async function post<TResponse, TData extends RequestData = RequestData>(
  url: string,
  data?: TData,
  options?: RequestOptions
): Promise<AxiosResponse<TResponse>> {
  return apiClient.post<TResponse>(url, data, options)
}

export async function put<TResponse, TData extends RequestData = RequestData>(
  url: string,
  data?: TData,
  options?: RequestOptions
): Promise<AxiosResponse<TResponse>> {
  return apiClient.put<TResponse>(url, data, options)
}

export async function del<TResponse>(
  url: string,
  data: RequestData,
  options?: RequestOptions
): Promise<AxiosResponse<TResponse>> {
  return apiClient.delete<TResponse>(url, { data, ...options })
}

export async function patch<TResponse, TData extends RequestData = RequestData>(
  url: string,
  data?: TData,
  options?: RequestOptions
): Promise<AxiosResponse<TResponse>> {
  return apiClient.patch<TResponse>(url, data, options)
}
