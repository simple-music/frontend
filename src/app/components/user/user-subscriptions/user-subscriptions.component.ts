import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../services/subscriptions.service';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {
  @Input() userId: string;

  subscriptionsIds: Array<string>;

  constructor(private subscriptionsService: SubscriptionsService) {}

  ngOnInit() {
    this.subscriptionsService.getSubscriptions(this.userId)
      .subscribe(users => this.subscriptionsIds = users);
  }
}
