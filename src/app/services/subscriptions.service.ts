import {Injectable} from '@angular/core';
import {Subscription} from '../models/subscription';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {NotFoundError} from '../errors/not-found-error';
import {InternalServerError} from '../errors/internal-server-error';
import {NotAuthorizedError} from '../errors/not-authorized-error';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  constructor(private apiService: ApiService,
              private authService: AuthService) {
  }

  async addSubscription(subscription: Subscription, retry: number = 0): Promise<void> {
    console.log('Ret: ', retry);

    const path = this.makePath(subscription);

    const response = await fetch(path, {
      method: 'POST',
      headers: [this.makeAuthHeader()]
    });

    switch (response.status) {
      case 200:
        return;

      case 401:
        if (retry !== 0) {
          throw new NotAuthorizedError();
        }
        await this.authService.refreshSession();
        return this.addSubscription(subscription, 1);

      case 404:
        throw new NotFoundError('User not found!');

      default:
        throw new InternalServerError(response);
    }
  }

  async checkSubscription(subsciption: Subscription): Promise<void> {
    const response = await fetch(this.makePath(subsciption));

    switch (response.status) {
      case 200:
        return;

      case 404:
        throw new NotFoundError('subscription not found!');

      default:
        throw new InternalServerError(response);
    }
  }

  async deleteSubscription(subscription: Subscription, retry: number = 0): Promise<void> {
    const path = this.makePath(subscription);

    const response = await fetch(path, {
      method: 'DELETE',
      headers: [this.makeAuthHeader()]
    });

    switch (response.status) {
      case 200:
        return;

      case 401:
        if (retry !== 0) {
          throw new NotAuthorizedError();
        }
        await this.authService.refreshSession();
        return this.addSubscription(subscription, 1);

      case 404:
        throw new NotFoundError('User not found!');

      default:
        throw new InternalServerError(response);
    }
  }

  getSubscribers(userId: string, onSuccess: any, onError: any): void {
    const path = '/users/' + userId + '/subscribers';
    this.getList(path, onSuccess, onError);
  }

  getSubscriptions(userId: string, onSuccess: any, onError: any): void {
    const path = '/users/' + userId + '/subscriptions';
    this.getList(path, onSuccess, onError);
  }

  // noinspection JSMethodCanBeStatic
  private makePath(subscription: Subscription): string {
    return this.apiService.getApiURL() +
      '/users/' + subscription.userId +
      '/subscriptions/' + subscription.subscriptionId;
  }

  private makeAuthHeader(): string[] {
    const authToken = this.authService.sessionInfo.authToken;
    return ['Authorization', 'Bearer ' + authToken];
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
