import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../services/subscriptions.service';

@Component({
  selector: 'app-user-subscribers',
  templateUrl: './user-subscribers.component.html',
  styleUrls: ['./user-subscribers.component.css']
})
export class UserSubscribersComponent implements OnInit {
  subscribers: Array<string>;
  subscribersPageIndex: number;
  showSubscribers: boolean;

  constructor(private subscriptionsService: SubscriptionsService) {
  }

  _userId: string;

  get userId() {
    return this._userId;
  }

  @Input()
  set userId(value: string) {
    this._userId = value;
    this.subscribersPageIndex = 0;
    this.getList();
  }

  ngOnInit() {
  }

  private getList(): void {
    this.subscriptionsService
      .getSubscribers(this._userId, this.subscribersPageIndex)
      .then(page => {
        if (page.empty) {
          if (page.totalPages !== 0) {
            this.subscribersPageIndex = 0;
            this.getList();
          } else {
            this.showSubscribers = false;
          }
        } else {
          this.subscribers = page.content;
          this.showSubscribers = true;
        }
      })
      .catch(() => {
        this.showSubscribers = false;
      });
  }
}
