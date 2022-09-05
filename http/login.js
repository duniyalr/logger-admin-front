import { getAxios } from "./axios"
export const httpLogin = async () => {
  console.log(getAxios().get())
}