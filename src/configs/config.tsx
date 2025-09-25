import { AxiosRequestConfig } from "axios";
import { AppCookie, cookiesKey } from "./cookies";
import { axiosConfig } from "./axios";

export interface AppConfig {
  env: string;
  appName: string;
  baseURL: {
    PUBLIC_URL: string;
    API_URL: string;
    CDN_URL: string;
  };
  cookie: AppCookie;
  axios: AxiosRequestConfig;
  cookiePrefix: string;
  secret: {
    apiKey: string;
  };
}

const cookiePrefix = "_r_";
const configs: AppConfig = {
  env: process.env.NODE_ENV,
  appName: "Modulax",
  baseURL: {
    PUBLIC_URL: process.env.NEXT_PUBLIC_URL ?? "",
    API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
    CDN_URL: process.env.NEXT_PUBLIC_CDN_URL ?? "",
  },
  cookie: cookiesKey(cookiePrefix),
  axios: axiosConfig,
  cookiePrefix: cookiePrefix,
  secret: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
  },
};

export default configs;
