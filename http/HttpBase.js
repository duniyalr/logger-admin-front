import HttpError from "./HttpError";

export const HttpBase = async (connectionPromise) => {
  try {
    const response = await connectionPromise;
    return response.data;
  } catch(err) {
    return new HttpError(err);
  }
}