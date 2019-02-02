import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../../services/subscriptions.service';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {
  subscriptions: Array<string>;
  showSubscriptions: boolean;

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
    this.subscriptionsService.getSubscriptions(this._userId, pageIndex)
      .then(page => {
        if (page.empty) {
          if (page.totalPages !== 0) {
            this.getList();
          } else {
            this.showSubscriptions = false;
          }
        } else {
          this.subscriptions = page.content;
          this.showSubscriptions = true;
        }
      })
      .catch(() => {
        this.showSubscriptions = false;
      });
  }
}
