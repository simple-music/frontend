import {EventEmitter, Injectable} from '@angular/core';
import {SessionInfo} from '../models/session-info';
import {Credentials} from '../models/credentials';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL: string;

  sessionInfo: SessionInfo = null;

  authEvent: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService) {
    this.apiURL = this.apiService.getApiURL();
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
        throw new Error('not authorized');

      default:
        throw new Error('internal server error');
    }
  }

  logout(): void {
    this.sessionInfo = null;
    this.authEvent.emit(false);
  }

  private saveSession(): void {
    window.localStorage.setItem('session',
      JSON.stringify(this.sessionInfo));
  }

  private loadSession(): void {
    const info = window.localStorage.getItem('session');
    if (info) {
      this.sessionInfo = JSON.parse(info);
    } else {
      this.sessionInfo = null;
    }
  }
}
