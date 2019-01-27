import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {NewUser} from '../models/new-user';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL: string;

  constructor(private apiService: ApiService) {
    this.apiURL = this.apiService.getApiURL();
  }

  addUser(user: NewUser, onSuccess: any, onError: any): void {
    fetch(this.apiService.getApiURL() + '/users', {
      method: 'POST',
      body: JSON.stringify(user)
    }).then(response => {
      switch (response.status) {
        case 201:
          onSuccess();
          break;

        case 409:
          response.json().then(obj => {
            onError(obj.message);
          });
          break;

        default:
          alert(this.apiService.getErrorMessage());
      }
    }).catch(error => {
      alert(error);
    });
  }

  getUser(userId: string, onSuccess: any, onError: any) {
    fetch(this.apiService.getApiURL() + '/users/' + userId)
      .then(response => {
        switch (response.status) {
          case 200:
            response.json().then(user => {
              onSuccess(user);
            });
            break;

          case 404:
            onError('user not found');
            break;

          default:
            alert(this.apiService.getErrorMessage());
      }
    }).catch(error => {
      alert(error);
    });
  }

  findUser(username: string): Observable<User> {
    return of(this.mockUser());
  }

  private mockUser(): User {
    return {
      id: '1eb9127b-bd40-47c6-aff4-c4f9b2fc8616',
      username: 'user' + Math.random().toString(),
      email: 'user@example.com',
      fullName: 'User Name',
      dateOfBirth: new Date(1990, 1, 1),
      musicalInstruments: ['guitar', 'drums', 'bass'],
      numSubscribers: 3,
      numSubscriptions: 3
    };
  }
}
