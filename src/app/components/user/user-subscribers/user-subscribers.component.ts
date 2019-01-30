import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../services/subscriptions.service';

@Component({
  selector: 'app-user-subscribers',
  templateUrl: './user-subscribers.component.html',
  styleUrls: ['./user-subscribers.component.css']
})
export class UserSubscribersComponent implements OnInit {
  subscribersIds: Array<string>;

  constructor(private subscriptionsService: SubscriptionsService) {
  }

  _userId: string;

  get userId() {
    return this._userId;
  }

  @Input()
  set userId(value: string) {
    this._userId = value;
    this.getList();
  }

  ngOnInit() {
  }

  private getList(): void {
    this.subscriptionsService.getSubscribers(this.userId, list => {
      this.subscribersIds = list;
    }, () => {
      this.subscribersIds = null;
    });
  }
}
