import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {UsersService} from '../../services/users.service';
import {UserUpdate} from '../../models/user-update';
import {NotFoundError} from '../../errors/not-found-error';
import {AvatarsService} from '../../services/avatars.service';
import {ValidationService} from '../../services/validation.service';
import {ConflictError} from '../../errors/conflict-error';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userId: string;

  userUpdate: UserUpdate = new UserUpdate();
  musicalInstruments: string;
  avatar: ArrayBuffer;

  error: string;

  constructor(private router: Router,
              private authService: AuthService,
              private usersService: UsersService,
              private avatarsService: AvatarsService,
              private validationService: ValidationService) {
  }

  ngOnInit() {
    if (this.authService.sessionInfo) {
      this.userId = this.authService.sessionInfo.userId;
    } else {
      this.navigateToLogin();
      return;
    }

    this.usersService.getUser(this.userId)
      .then(user => {
        this.userUpdate = {
          email: user.email,
          fullName: user.fullName,
          dateOfBirth: user.dateOfBirth,
          musicalInstruments: null,
        };
        this.musicalInstruments = user.musicalInstruments.join(',');
      })
      .catch(error => {
        if (error instanceof NotFoundError) {
          this.navigateToNotFound();
        } else {
          this.navigateToErrorPage();
        }
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
    this.avatarsService.addAvatar(this.userId, this.avatar)
      .then(() => {
        this.navigateToLogin();
      })
      .catch(() => {
        this.navigateToErrorPage();
      });
  }

  onBtnSubmitUpdateClick(): void {
    this.userUpdate.musicalInstruments = this.musicalInstruments.split(',');
    try {
      this.validateUpdates();
      this.error = '';
    } catch (err) {
      this.error = err.message;
      return;
    }

    this.usersService.updateUser(this.userId, this.userUpdate)
      .then(() => this.navigateToProfile())
      .catch(err => {
        if (err instanceof ConflictError) {
          this.error = err.message;
        } else {
          this.navigateToErrorPage();
        }
      });
  }

  private validateUpdates(): void {
    this.validationService.checkEmail(this.userUpdate.email);
    this.validationService.checkFullName(this.userUpdate.fullName);
  }

  private navigateToLogin(): void {
    this.router.navigate(['/login']).then()
      .catch(error => console.log(error));
  }

  private navigateToProfile(): void {
    this.router.navigate(['/user/' + this.authService.sessionInfo.userId]).then()
      .catch(error => console.log(error));
  }

  private navigateToNotFound(): void {
    this.router.navigate(['/not-found-error']).then()
      .catch(error => console.log(error));
  }

  private navigateToErrorPage(): void {
    this.router.navigate(['/internal-service-error']).then()
      .catch(error => console.log(error));
  }
}
