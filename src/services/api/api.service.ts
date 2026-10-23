import { MATCHES_URL } from "../../config";
import { ApiConfig, ApiError, Method, RequestOptions } from "../../shared/api.types";

const config: ApiConfig = {
  baseURL: MATCHES_URL,
};

const buildUrl = (endpoint: string, params?: Record<string, string | number>) => {
  const url = new URL(`${config.baseURL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
};

async function request<T>(
  method: Method,
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, body, headers } = options;
  
  const url = buildUrl(endpoint, params);

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...config.headers,
      ...headers,
    },
  };

  if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText || 'Something went wrong',
        data
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network Error', error);
  }
}

export const apiService = {
  get: <T>(endpoint?: string, params?: RequestOptions['params']) => 
    request<T>('GET', endpoint ?? '', { params }),

  post: <T, B = unknown>(endpoint?: string, body?: B) => 
    request<T>('POST', endpoint ?? '', { body }),

  put: <T, B = unknown>(endpoint?: string, body?: B) => 
    request<T>('PUT', endpoint ?? '', { body }),

  delete: <T>(endpoint?: string) => 
    request<T>('DELETE', endpoint ?? ''),
};