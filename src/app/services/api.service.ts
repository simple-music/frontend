import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backendURL = 'http://127.0.0.1:8080';
  private apiURL = this.backendURL + '/api';

  getApiURL(): string {
    return this.apiURL;
  }

  makePath(path: string): string {
    return this.apiURL + path;
  }

  getErrorMessage(): string {
    return 'internal server error';
  }
}
