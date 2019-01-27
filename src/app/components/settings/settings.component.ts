import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import {UserUpdate} from '../../models/user-update';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userUpdate: UserUpdate;
  musicalInstruments: string;

  constructor(private router: Router,
              private authService: AuthService,
              private usersService: UsersService) {
  }

  ngOnInit() {
    if (!this.authService.sessionInfo) {
      this.navigateToLogin();
    }
    this.usersService
      .getUser(this.authService.sessionInfo.userId)
      .subscribe(user => {
        this.userUpdate = {
          email: user.email,
          fullName: user.fullName,
          dateOfBirth: user.dateOfBirth,
          musicalInstruments: user.musicalInstruments
        };
        this.musicalInstruments = user.musicalInstruments.join(',');
      });
  }

  onBtnSubmitClick(): void {
    console.log(this.userUpdate);
    // TODO
  }

  private navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
