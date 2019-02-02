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

  public async addSubscription(subscription: Subscription, retry: number = 0): Promise<void> {
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

  public async checkSubscription(subscription: Subscription): Promise<void> {
    const response = await fetch(this.makePath(subscription));

    switch (response.status) {
      case 200:
        return;

      case 404:
        throw new NotFoundError('subscription not found!');

      default:
        throw new InternalServerError(response);
    }
  }

  public async deleteSubscription(subscription: Subscription, retry: number = 0): Promise<void> {
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

  public async getSubscribers(userId: string, page: number): Promise<any> {
    const path = '/users/' + userId +
      '/subscribers?page=' + page.toString();
    return this.getList(path);
  }

  public async getSubscriptions(userId: string, page: number): Promise<any> {
    const path = '/users/' + userId +
      '/subscriptions?page=' + page.toString();
    return this.getList(path);
  }

  // noinspection JSMethodCanBeStatic
  private makePath(subscription: Subscription): string {
    return this.apiService.makePath('/users/' + subscription.userId +
      '/subscriptions/' + subscription.subscriptionId);
  }

  private makeAuthHeader(): string[] {
    const authToken = this.authService.sessionInfo.authToken;
    return ['Authorization', 'Bearer ' + authToken];
  }

  private async getList(path: string): Promise<any> {
    const response = await fetch(this.apiService.makePath(path));

    switch (response.status) {
      case 200:
        return await response.json();

      default:
        throw new InternalServerError(response);
    }
  }
}
