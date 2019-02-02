import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../../services/subscriptions.service';
import {AuthService} from '../../../../services/auth.service';
import {Subscription} from '../../../../models/subscription';
import {NotFoundError} from '../../../../errors/not-found-error';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  isSubscribed = false;
  canSubscribe = false;
  private _userId: string;

  constructor(private authService: AuthService,
              private subscriptionsService: SubscriptionsService) {
  }

  private _subscriptionId: string;

  get subscriptionId() {
    return this._subscriptionId;
  }

  @Input()
  set subscriptionId(value: string) {
    this._subscriptionId = value;
    this.checkSubscription();
  }

  ngOnInit() {
  }

  onBtnSubscribeClick(): void {
    this.subscriptionsService.addSubscription(this.makeSubscription())
      .then(() => this.isSubscribed = true)
      .catch(error => console.log(error));
  }

  onBtnUnsubscribeClick(): void {
    this.subscriptionsService.deleteSubscription(this.makeSubscription())
      .then(() => this.isSubscribed = false)
      .catch(error => console.log(error));
  }

  private checkSubscription(): void {
    this._userId = this.authService.sessionInfo.userId;
    console.log(this._userId, this.subscriptionId);
    if (this._userId === this.subscriptionId) {
      this.canSubscribe = false;
      return;
    }
    this.subscriptionsService.checkSubscription(this.makeSubscription())
      .then(() => {
        this.isSubscribed = true;
        this.canSubscribe = true;
      })
      .catch(error => {
        if (error instanceof NotFoundError) {
          this.isSubscribed = false;
          this.canSubscribe = true;
        } else {
          this.canSubscribe = false;
        }
      });
  }

  private makeSubscription(): Subscription {
    return {
      userId: this._userId,
      subscriptionId: this.subscriptionId
    };
  }
}
