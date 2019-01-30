import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../services/subscriptions.service';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {
  _userId: string;

  @Input()
  set userId(value: string) {
    this._userId = value;
    this.getList();
  }

  get userId() {
    return this._userId;
  }

  subscriptionsIds: Array<string>;

  constructor(private subscriptionsService: SubscriptionsService) {
  }

  ngOnInit() {
  }

  private getList(): void {
    this.subscriptionsService.getSubscriptions(this.userId, list => {
      this.subscriptionsIds = list;
    }, () => {
      this.subscriptionsIds = null;
    });
  }
}
