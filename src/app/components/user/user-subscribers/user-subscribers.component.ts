import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../services/subscriptions.service';

@Component({
  selector: 'app-user-subscribers',
  templateUrl: './user-subscribers.component.html',
  styleUrls: ['./user-subscribers.component.css']
})
export class UserSubscribersComponent implements OnInit {
  @Input() userId: string;

  subscribersIds: Array<string>;

  constructor(private subscriptionsService: SubscriptionsService) {}

  ngOnInit() {
    this.subscriptionsService.getSubscribers(this.userId)
      .subscribe(users => this.subscribersIds = users);
  }
}
