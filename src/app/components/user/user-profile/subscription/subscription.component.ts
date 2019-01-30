import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../../services/subscriptions.service';
import {AuthService} from '../../../../services/auth.service';
import {Subscription} from '../../../../models/subscription';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  userId: string;
  @Input() subscriptionId: string;

  isSubscribed = false;

  constructor(private authService: AuthService,
              private subscriptionsService: SubscriptionsService) {
  }

  ngOnInit() {
    this.userId = this.authService.sessionInfo.userId;
    console.log(this.userId, this.subscriptionId);
    if (this.userId === this.subscriptionId) {
      return;
    }
    this.subscriptionsService
      .checkSubscription(this.userId, this.subscriptionId)
      .subscribe(ok => this.isSubscribed = ok);
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

  private makeSubscription(): Subscription {
    return {
      userId: this.userId,
      subscriptionId: this.subscriptionId
    };
  }
}
