import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
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
