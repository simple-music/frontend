import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../../../services/users.service';
import {User} from '../../../../models/user';

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
    this.usersService.getUser(this.userId, user => {
      this.user = user;
    }, error => {
      alert(error);
    });
  }
}
