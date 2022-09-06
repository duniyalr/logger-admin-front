export default class HttpREsponse {
  constructor(response) {
    this.data = response.data;
    this.statusCode = response.status;
    this.success = true;
  }
}