import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../../../services/users.service';
import {User} from '../../../../models/user';
import {NotFoundError} from '../../../../errors/not-found-error';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.css']
})
export class UsersListItemComponent implements OnInit {
  @Input() userId: string;

  user: User;
  showUser: boolean;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUser(this.userId)
      .then(user => {
        this.user = user;
        this.showUser = true;
      })
      .catch(() => {
        this.showUser = false;
      });
  }
}
