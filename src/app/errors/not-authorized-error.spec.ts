import { NotAuthorizedError } from './not-authorized-error';

describe('NotAuthorizedError', () => {
  it('should create an instance', () => {
    expect(new NotAuthorizedError()).toBeTruthy();
  });
});
