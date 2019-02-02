import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../../models/user';
import {UsersService} from '../../../services/users.service';
import {NotFoundError} from '../../../errors/not-found-error';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();

  constructor(private router: Router,
              private usersService: UsersService) {
  }

  _userId: string;

  get userId() {
    return this._userId;
  }

  @Input()
  set userId(value: string) {
    this._userId = value;
    this.getUser();
  }

  ngOnInit() {
  }

  private getUser(): void {
    this.usersService.getUser(this.userId)
      .then(user => this.user = user)
      .catch(error => {
        if (error instanceof NotFoundError) {
          this.navigateToNotFound();
        } else {
          this.navigateToErrorPage();
        }
      });
  }

  private navigateToNotFound(): void {
    this.router.navigate(['/not-found-error']).then();
  }

  private navigateToErrorPage(): void {
    this.router.navigate(['/internal-service-error']).then();
  }
}
