import _axios from "axios";
import { sessionKey } from "../config";
let isFirstGet = true
let axios = _axios;

export const getAxios = () => {
  if (isFirstGet) {
    setAxios(window?.localStorage.getItem("session"));
    isFirstGet = false;
  }
  return axios;
}

export const setAxios = (session) => {
  axios = _axios.create({
    headers: {
      [sessionKey]: session
    }
  });
}