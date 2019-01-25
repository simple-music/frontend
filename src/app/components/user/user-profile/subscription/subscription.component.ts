import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../../services/subscriptions.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  @Input() subscriptionId: string;

  isSubscribed = false;

  constructor(private authService: AuthService,
              private subscriptionsService: SubscriptionsService) {
  }

  ngOnInit() {
    const userId = this.authService.sessionInfo.userId;
    if (userId === this.subscriptionId) {
      return;
    }
    this.subscriptionsService
      .checkSubscription(userId, this.subscriptionId)
      .subscribe(ok => this.isSubscribed = ok);
  }
}
