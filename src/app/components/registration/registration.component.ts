import { Component, OnInit } from '@angular/core';
import {NewUser} from '../../models/new-user';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: NewUser = new NewUser();

  constructor(private router: Router,
              private usersService: UsersService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.sessionInfo) {
      this.navigateToProfile();
    }
  }

  onBtnSubmitClick() {
    const user = this.user;
    this.usersService.addUser(user)
      .subscribe(() => {
        this.authService.login({
          username: user.username,
          password: user.password
        }).subscribe(() => {
          this.navigateToProfile();
        });
      });
  }

  navigateToProfile(): void {
    this.router.navigate(['/user/' + this.authService.sessionInfo.userId]);
  }
}
