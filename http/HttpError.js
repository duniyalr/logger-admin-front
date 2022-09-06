export default class HttpError {
  constructor(axiosError) {
    const response = axiosError.response;
    this.error = response.data;
    this.statusCode = response.status;
    this.success = false;
  }
}