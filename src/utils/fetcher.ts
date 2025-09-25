import { ApiError, ApiResponse } from "@/types/api.type";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosApi } from "./axios";

export interface Fetcher<D> {
  url: string;
  data?: D;
  config?: AxiosRequestConfig<D>;
  useAuth?: boolean;
}

export async function fetcherGET<T, D = any>({
  url,
  config,
}: Fetcher<D>): Promise<T> {
  const res = await axiosApi.get<any, AxiosResponse<ApiResponse<T>, any>, any>(
    url,
    config
  );

  return res.data.data;
}

export async function fetcherPOST<T, D = any>({
  url,
  data,
  config,
}: Fetcher<D>): Promise<T> {
  const res = await axiosApi.post<any, AxiosResponse<ApiResponse<T>, any>, any>(
    url,
    data,
    config
  );

  return res.data.data;
}

export async function fetcherPATCH<T, D = any>({
  url,
  data,
  config,
}: Fetcher<D>): Promise<T> {
  const res = await axiosApi.patch<
    any,
    AxiosResponse<ApiResponse<T>, any>,
    any
  >(url, data, config);
  return res.data.data;
}

export async function fetcherDELETE<T, D = any>({
  url,
  config,
}: Fetcher<D>): Promise<T> {
  const res = await axiosApi.delete<
    any,
    AxiosResponse<ApiResponse<T>, any>,
    any
  >(url, config);
  return res.data.data;
}

export function translateError(error: AxiosError<ApiError>): {
  message: string;
  statusCode?: number;
  data?: any;
} {
  if (error.response) {
    const { data } = error.response;
    return {
      message: data.message || "An error occurred",
      statusCode: data.statusCode,
      data: data.data || [],
    };
  } else if (error.request) {
    return { message: "No response received from the server" };
  } else {
    return { message: error.message };
  }
}
