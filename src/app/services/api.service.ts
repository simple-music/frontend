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

  getErrorMessage(): string {
    return 'Internal Service Error';
  }
}
