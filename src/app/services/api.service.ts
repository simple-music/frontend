import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backendURL = 'http://127.0.0.1:8000';
  private baseURL = this.backendURL + '/api';

  getBaseURL(): string {
    return this.baseURL;
  }
}
