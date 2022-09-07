import { getAxios } from "./axios"
import { HttpBase } from "./HttpBase"

export const httpCreateSection = (data) => { 
  return HttpBase(getAxios().post("/api/section", data));
}