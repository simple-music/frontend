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

  login(credentials: Credentials, onSuccess: any, onError: any): void {
    fetch(this.apiURL + '/auth/session', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }).then(response => {
      switch (response.status) {
        case 200:
          response.json().then(info => {
            this.sessionInfo = info;
            this.saveSession();
            onSuccess();
          });
          break;

        case 404:
          onError();
          break;

        default:
          alert('internal service error');
      }
    }).catch(error => {
      alert(error);
    });
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
