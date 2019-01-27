import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {NewUser} from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {
  }

  addUser(user: NewUser): Observable<boolean> {
    // TODO
    return of(true);
  }

  getUser(userId: string): Observable<User> {
    return of(this.mockUser());
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
