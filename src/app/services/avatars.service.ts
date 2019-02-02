import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {InternalServerError} from '../errors/internal-server-error';
import {AuthService} from './auth.service';
import {NotAuthorizedError} from '../errors/not-authorized-error';

@Injectable({
  providedIn: 'root'
})
export class AvatarsService {
  constructor(private apiService: ApiService,
              private authService: AuthService) {
  }

  public async addAvatar(userId: string, buffer: ArrayBuffer, retry: number = 0): Promise<void> {
    const path = this.apiService.makePath('/users/' + userId + '/avatar');

    const response = await fetch(path, {
      method: 'POST',
      body: buffer,
      headers: [this.makeAuthHeader()]
    });

    switch (response.status) {
      case 200:
        return;

      case 401:
        if (retry !== 0) {
          throw new NotAuthorizedError();
        }
        await this.authService.refreshSession();
        return this.addAvatar(userId, buffer, 1);

      default:
        throw new InternalServerError(response);
    }
  }

  public getAvatarPath(userId: string): string {
    return this.apiService.makePath('/users/' + userId + '/avatar');
  }

  public getDefaultAvatarPath(): string {
    return this.getAvatarPath('default');
  }

  private makeAuthHeader(): string[] {
    const authToken = this.authService.sessionInfo.authToken;
    return ['Authorization', 'Bearer ' + authToken];
  }
}
