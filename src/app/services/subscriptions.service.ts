import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Subscription} from '../models/subscription';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  constructor(private apiService: ApiService) {
  }

  addSubscription(subscription: Subscription,
                  onSuccess: any,
                  onAuthRequired: any,
                  onError: any): void {
    const path = '/users/' + subscription.userId +
      '/subscriptions/' + subscription.subscriptionId;

    fetch(this.apiService.getApiURL() + path, {
      method: 'POST'
    }).then(response => {
      switch (response.status) {
        case 200:
          onSuccess();
          break;

        case 401:
          onAuthRequired();
          break;

        default:
          alert(this.apiService.getErrorMessage());
      }
    }).catch(error => {
      alert(error);
    });
  }

  checkSubscription(userId: string, subscriptionId: string): Observable<boolean> {
    return of(false);
  }

  deleteSubscription(userId: string, subscriptionId: string): Observable<boolean> {
    return of(false);
  }

  getSubscribers(userId: string, onSuccess: any, onError: any): void {
    const path = '/users/' + userId + '/subscribers';
    this.getList(path, onSuccess, onError);
  }

  getSubscriptions(userId: string, onSuccess: any, onError: any): void {
    const path = '/users/' + userId + '/subscriptions';
    this.getList(path, onSuccess, onError);
  }

  private getList(path: string, onSuccess: any, onError: any): void {
    fetch(this.apiService.getApiURL() + path)
      .then(response => {
        switch (response.status) {
          case 200:
            response.json().then(list => {
              onSuccess(list);
            });
            break;

          case 404:
            response.json().then(error => {
              onError(error.message);
            });
            break;

          default:
            alert(this.apiService.getErrorMessage());
        }
      }).catch(error => {
        alert(error);
      });
  }
}
