import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../services/subscriptions.service';

@Component({
  selector: 'app-user-subscribers',
  templateUrl: './user-subscribers.component.html',
  styleUrls: ['./user-subscribers.component.css']
})
export class UserSubscribersComponent implements OnInit {
  subscribers: Array<string>;
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
    this.getList();
  }

  ngOnInit() {
  }

  private getList(pageIndex: number = 0): void {
    this.subscriptionsService.getSubscribers(this._userId, pageIndex)
      .then(page => {
        if (page.empty) {
          if (page.totalPages !== 0) {
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
