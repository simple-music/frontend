import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UsersService} from '../../../services/users.service';
import {NotFoundError} from '../../../errors/not-found-error';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() userId: string;

  user: User = new User();

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
