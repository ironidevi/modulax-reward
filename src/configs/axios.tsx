import { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
  timeout: 15000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
