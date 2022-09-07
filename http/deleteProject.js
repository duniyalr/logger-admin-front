import { getAxios } from "./axios"
import { HttpBase } from "./HttpBase"

export const httpDeleteProject = (data) => { 
  return HttpBase(getAxios().delete("/api/project/" + data.projectId));
}