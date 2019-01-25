import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor() { }

  addSubscription(userId: string, subscriptionId: string): Observable<boolean> {
    return of(true);
  }

  checkSubscription(userId: string, subscriptionId: string): Observable<boolean> {
    return of(false);
  }

  deleteSubscription(userId: string, subscriptionId: string): Observable<boolean> {
    return of(false);
  }

  getSubscribers(userId: string): Observable<Array<string>> {
    return of([
      '7ac8d64f-6d6f-44b7-bba1-f25d01192445',
      '08ea0be9-3bea-4171-be3e-3e85eb8bf885',
      'cb44cba6-f524-42fa-9216-f9b3ab03505a'
    ]);
  }

  getSubscriptions(userId: string): Observable<Array<string>> {
    return of([
      '7ac8d64f-6d6f-44b7-bba1-f25d01192445',
      '08ea0be9-3bea-4171-be3e-3e85eb8bf885',
      'cb44cba6-f524-42fa-9216-f9b3ab03505a'
    ]);
  }
}
