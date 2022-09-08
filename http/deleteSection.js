import { getAxios } from "./axios"
import { HttpBase } from "./HttpBase"

export const httpDeleteSection = (data) => { 
  return HttpBase(getAxios().delete("/api/section/" + data.sectionId));
}