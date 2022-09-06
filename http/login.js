import { getAxios } from "./axios"
import { api } from "../config"
import HttpError from "./HttpError";
import { HttpBase } from "./HttpBase";

export const httpLogin = (data) => {
  return HttpBase(getAxios().post("/api/auth/login", data));
}