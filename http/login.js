import { getAxios } from "./axios"
import { api } from "../config"
import HttpError from "./HttpError";

export const httpLogin = async (data) => {
  try {
    const response = await getAxios().post("/api/auth/login", data);
    console.log(response.headers)
    return response.data;
  } catch(err) {
    return new HttpError(err);
  }
}