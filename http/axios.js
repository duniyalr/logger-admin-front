import _axios from "axios";
import { sessionKey } from "../config";

let axios = _axios;

export const getAxios = () => {
  return axios;
}

export const setAxios = (session) => {
  axios = _axios.create({
    headers: {
      [sessionKey]: session
    }
  });
}