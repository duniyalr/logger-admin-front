import { getAxios } from "./axios"
import { HttpBase } from "./HttpBase"

export const httpDeleteSectionSessoin = (data) => { 
  return HttpBase(getAxios().delete("/api/section/session/" + data.sessionId));
}