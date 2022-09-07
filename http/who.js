import { getAxios } from "./axios"
import { HttpBase } from "./HttpBase";

export const httpWho = () => {
  return HttpBase(getAxios().get("/api/auth/who"));
}