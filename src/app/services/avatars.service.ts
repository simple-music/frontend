import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarsService {

  constructor() { }

  getAvatar(userId: string): Observable<string> {
    return of('https://via.placeholder.com/150');
  }
}
