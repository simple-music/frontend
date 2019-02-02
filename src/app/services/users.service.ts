import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {NewUser} from '../models/new-user';
import {ApiService} from './api.service';
import {InternalServerError} from '../errors/internal-server-error';
import {ConflictError} from '../errors/conflict-error';
import {NotFoundError} from '../errors/not-found-error';
import {UserUpdate} from '../models/user-update';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private apiService: ApiService,
              private authService: AuthService) {
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
    const path = this.apiService.makePath('/users/' + userId);
    return this.getInfo(path);
  }

  public async findUser(username: string): Promise<User> {
    const path = this.apiService.makePath('/users?username=' + username);
    return this.getInfo(path);
  }

  public async updateUser(userId: string, userUpdate: UserUpdate): Promise<void> {
    const path = this.apiService.makePath('/users/' + userId);

    const response = await fetch(path, {
      method: 'PATCH',
      body: JSON.stringify(userUpdate),
      headers: [this.makeAuthHeader()]
    });

    switch (response.status) {
      case 200:
        return;

      case 409:
        throw new ConflictError('Email is already used by someone!');

      default:
        throw new InternalServerError(response);
    }
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

  private makeAuthHeader(): string[] {
    const authToken = this.authService.sessionInfo.authToken;
    return ['Authorization', 'Bearer ' + authToken];
  }
}
