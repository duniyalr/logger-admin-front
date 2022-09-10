import { getAxios } from "./axios"
import { HttpBase } from "./HttpBase"

export const httpCreateSectionSession = (data) => { 
  return HttpBase(getAxios().post("/api/section/session", data));
}