import {Injectable} from '@angular/core';
import {SessionInfo} from '../models/session-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionInfo: SessionInfo;

  constructor() {
    this.sessionInfo = {
      userId: '8cfd8eed-9abe-4a75-a9dc-90b386d746b4',
      authToken: '8cfd8eed-9abe-4a75-a9dc-90b386d746b4',
      refreshToken: '8cfd8eed-9abe-4a75-a9dc-90b386d746b4'
    };
    // this.loadSession();
  }

  login() {
    // TODO
  }

  logout() {
    this.sessionInfo = null;
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
