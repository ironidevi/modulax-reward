import { RequestQueryParams } from "@/types/api.type";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";

export const generateQueryFromMap = (query: RequestQueryParams) => {
  let queryParams = `?`;

  if (query) {
    const queryArray: string[] = [];
    Object.keys(query).forEach((key) => {
      if (query[key]) {
        queryArray.push(`${key}=${query[key]}`);
      }
    });

    queryParams += `${queryArray.join("&")}`;
  }

  return queryParams;
};

export const handleToastError = (e: AxiosError<ApiError>) => {
  if (e.response?.data?.message) {
    toast.error(`🙁 Oops!, ${e.response.data.message}`);
  } else {
    toast.error(`🙁 Oops!, ${e.message}`);
  }
};
