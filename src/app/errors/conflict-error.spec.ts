import { ConflictError } from './conflict-error';

describe('ConflictError', () => {
  it('should create an instance', () => {
    expect(new ConflictError()).toBeTruthy();
  });
});
