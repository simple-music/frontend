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
  userId: string;

  userUpdate: UserUpdate;
  musicalInstruments: string;
  avatar: ArrayBuffer;

  constructor(private router: Router,
              private authService: AuthService,
              private usersService: UsersService) {
  }

  ngOnInit() {
    if (!this.authService.sessionInfo) {
      this.navigateToLogin();
    }

    this.userId = this.authService.sessionInfo.userId;

    this.usersService.getUser(this.userId)
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

  onAvatarChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.onload = () => {
        this.avatar = reader.result as ArrayBuffer;
      };
      reader.readAsArrayBuffer(file);
    }
  }

  onBtnSubmitAvatarClick(): void {
    console.log(this.avatar);
    // TODO
  }

  onBtnSubmitUpdateClick(): void {
    console.log(this.userUpdate);
    // TODO
  }

  private navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
