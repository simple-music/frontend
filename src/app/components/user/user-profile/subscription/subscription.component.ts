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
    if (this.authService.authId === this.subscriptionId) {
      return;
    }
    this.subscriptionsService
      .checkSubscription(this.authService.authId, this.subscriptionId)
      .subscribe(ok => this.isSubscribed = ok);
  }
}
