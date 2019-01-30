import { Injectable } from '@angular/core';
import {ValidationError} from '../errors/validation-error';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {
  }

  // noinspection JSMethodCanBeStatic
  checkUsername(username: string): void {
    if (!/^\w+$/.test(username)) {
      throw new ValidationError('Only letters and digits are allowed in username!');
    }
  }

  // noinspection JSMethodCanBeStatic
  checkPassword(password: string): void {
    if (password.length < 8) {
      throw new ValidationError('Password too short!');
    }
  }

  // noinspection JSMethodCanBeStatic
  checkEmail(email: string): void {
    if (!/^.+@.+$/.test(email)) {
      throw new ValidationError('Wrong email!');
    }
  }

  // noinspection JSMethodCanBeStatic
  checkFullName(fullName: string): void {
    if (!/^((\w)+ ?)+$/.test(fullName)) {
      throw new ValidationError('Only letters, digits and spaces are allowed in name!');
    }
  }
}
