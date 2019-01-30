import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {NewUser} from '../models/new-user';
import {ApiService} from './api.service';
import {InternalServerError} from '../errors/internal-server-error';
import {ConflictError} from '../errors/conflict-error';
import {NotFoundError} from '../errors/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private apiService: ApiService) {
  }

  public async addUser(user: NewUser): Promise<void> {
    const path = this.apiService.makePath('/users');

    const response = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(user)
    });

    switch (response.status) {
      case 201:
        return;

      case 409:
        throw new ConflictError('User with such username or email is already registered!');

      default:
        throw new InternalServerError(response);
    }
  }

  public async getUser(userId: string): Promise<User> {
    const path = this.apiService
      .makePath('/users/' + userId);
    return this.getInfo(path);
  }

  public async findUser(username: string): Promise<User> {
    const path = this.apiService
      .makePath('/users?username=' + username);
    return this.getInfo(path);
  }

  // noinspection JSMethodCanBeStatic
  private async getInfo(path: string): Promise<User> {
    const response = await fetch(path);

    switch (response.status) {
      case 200:
        return await response.json();

      case 404:
        throw new NotFoundError('User not found!');

      default:
        throw new InternalServerError(response);
    }
  }
}
