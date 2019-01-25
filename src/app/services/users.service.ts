import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {
  }

  getUser(userId): Observable<User> {
    return of({
      id: '1eb9127b-bd40-47c6-aff4-c4f9b2fc8616',
      username: 'user',
      email: 'user@example.com',
      fullName: 'User Name',
      dateOfBirth: new Date(1990, 1, 1),
      musicalInstruments: ['guitar', 'drums', 'bass'],
      numSubscribers: 3,
      numSubscriptions: 3
    });
  }
}
