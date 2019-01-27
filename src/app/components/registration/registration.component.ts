import {Component, OnInit} from '@angular/core';
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
    this.usersService.addUser(this.user, () => {
      this.authService.login({
        username: this.user.username,
        password: this.user.password
      }, () => {
        this.navigateToProfile();
      }, message => {
        alert(message);
      });
    }, message => {
      alert(message);
    });
  }

  private navigateToProfile(): void {
    this.router.navigate(['/user/' + this.authService.sessionInfo.userId]);
  }
}
