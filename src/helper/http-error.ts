export class HttpResponseError extends Error {
  constructor(response: Response) {
    super(`Error ${response.status} ${response.statusText}`);
    this.response = response;
  }

  response: Response;

  static checkResponse(response: Response): Response {
    if (!response.ok) {
      throw new HttpResponseError(response);
    } else {
      return response;
    }
  }
}
