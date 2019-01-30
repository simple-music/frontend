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

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUser(this.userId)
      .then(user => this.user = user)
      .catch(error => {
        if (error instanceof NotFoundError) {
          console.log(error.message); // TODO
        } else {
          console.log(error.message); // TODO
        }
      });
  }
}
