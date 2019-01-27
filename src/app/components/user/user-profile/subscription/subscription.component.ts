import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../../services/subscriptions.service';
import {AuthService} from '../../../../services/auth.service';

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
}
