import {EventEmitter, Injectable} from '@angular/core';

import {SessionInfo} from '../models/session-info';
import {Credentials} from '../models/credentials';
import {ApiService} from './api.service';
import {NotAuthorizedError} from '../errors/not-authorized-error';
import {InternalServerError} from '../errors/internal-server-error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionInfo: SessionInfo = null;
  authEvent: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService) {
    this.loadSession();
  }

  async login(credentials: Credentials): Promise<void> {
    const path = this.makePath();

    const response = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    switch (response.status) {
      case 200:
        this.sessionInfo = await response.json();
        this.saveSession();
        return;

      case 404: // TODO
        throw new NotAuthorizedError();

      default:
        throw new InternalServerError(response);
    }
  }

  async refreshSession(refreshToken: string =
                         this.sessionInfo.refreshToken): Promise<void> {
    const path = this.makePath() + '?refreshToken=' + refreshToken;

    const response = await fetch(path, {
      method: 'PATCH'
    });

    switch (response.status) {
      case 200:
        this.sessionInfo = await response.json();
        this.saveSession(false);
        return;

      case 404:
      case 401:
      case 403: // TODO
        throw new NotAuthorizedError();

      default:
        throw new InternalServerError(response);
    }
  }

  async logout(): Promise<void> {
    const path = this.apiService.makePath('/auth/session');
    const response = await fetch(path, {
      method: 'DELETE',
    });

    switch (response.status) {
      case 200:
      case 401:
      case 403:
        this.deleteSession();
        return;

      default:
        throw new InternalServerError(response);
    }
  }

  private makePath(): string {
    return this.apiService.makePath('/auth/session');
  }

  private saveSession(shouldNotify: boolean = true): void {
    window.localStorage.setItem('session',
      JSON.stringify(this.sessionInfo));
    if (shouldNotify) {
      this.authEvent.emit(true);
    }
  }

  private loadSession(): void {
    const info = window.localStorage.getItem('session');
    if (info) {
      const sessionInfo = JSON.parse(info);
      this.refreshSession(sessionInfo.refreshToken)
        .then(() => {
          this.sessionInfo = sessionInfo;
          this.authEvent.emit(true);
        })
        .catch(() => {
          this.deleteSession();
        });
    } else {
      this.sessionInfo = null;
    }
  }

  private deleteSession(): void {
    window.localStorage.removeItem('session');
    this.sessionInfo = null;
    this.authEvent.emit(false);
  }
}
