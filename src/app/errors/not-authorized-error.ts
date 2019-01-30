export class NotAuthorizedError extends Error {
  constructor() {
    super('Not Authorized');
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
