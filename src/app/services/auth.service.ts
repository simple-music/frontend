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
    const path = this.apiService.makePath('/auth/session');
    const response = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    switch (response.status) {
      case 200:
        this.sessionInfo = await response.json();
        this.saveSession();
        break;

      case 404:
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
        break;

      default:
        throw new InternalServerError(response);
    }
  }

  private saveSession(): void {
    window.localStorage.setItem('session',
      JSON.stringify(this.sessionInfo));
    this.authEvent.emit(true);
  }

  private loadSession(): void {
    const info = window.localStorage.getItem('session');
    if (info) {
      this.sessionInfo = JSON.parse(info);
      this.authEvent.emit(true);
    } else {
      this.sessionInfo = null;
    }
  }

  private deleteSession(): void {
    this.sessionInfo = null;
    this.authEvent.emit(false);
  }
}
