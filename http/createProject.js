import { getAxios } from "./axios"
import { HttpBase } from "./HttpBase"

export const httpCreateProject = (data) => { 
  return HttpBase(getAxios().post("/api/project", data));
}