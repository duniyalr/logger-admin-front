import { getAxios } from "../axios"
import { HttpBase } from "../HttpBase"

export const basicFetcher = async (url) => {
  console.log("fetcher")
  return HttpBase(getAxios().get(url));
}