export class InternalServerError extends Error {
  private readonly response: Response;

  constructor(response: Response) {
    super('Internal Server Error');
    this.response = response;
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
