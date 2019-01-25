import {Injectable} from '@angular/core';
import {SessionInfo} from '../models/session-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionInfo: SessionInfo;

  constructor() {
    this.loadSession();
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
