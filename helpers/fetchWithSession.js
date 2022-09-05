import { apiHost, sessionKey } from "../config"
export const fetchWithSession = async (url, req) => {
  const session = req.headers[sessionKey];
  const res = await fetch(apiHost + url, {
    headers: {
      [sessionKey]: session
    }
  });
  const data = await res.json();
  return data;
}