import {Component, OnInit} from '@angular/core';
import {NewUser} from '../../models/new-user';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ConflictError} from '../../errors/conflict-error';
import {NotAuthorizedError} from '../../errors/not-authorized-error';
import {ValidationService} from '../../services/validation.service';
import {ValidationError} from '../../errors/validation-error';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: NewUser = new NewUser();

  passwordConfirmed: string;

  error: string;

  constructor(private router: Router,
              private validationService: ValidationService,
              private usersService: UsersService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.sessionInfo) {
      this.navigateToProfile();
    }
  }

  onBtnSubmitClick() {
    try {
      this.validateForm();
      this.error = null;
    } catch (err) {
      this.error = err.message;
      return;
    }

    this.registerAndLogin()
      .then(() => this.navigateToProfile())
      .catch(err => {
        if (err instanceof ConflictError) {
          this.error = err.message;
        } else if (err instanceof NotAuthorizedError) {
          this.navigateToErrorPage();
        } else {
          this.navigateToErrorPage();
        }
      });
  }

  private async registerAndLogin(): Promise<void> {
    await this.usersService.addUser(this.user);
    await this.authService.login({
      username: this.user.username,
      password: this.user.password
    });
  }

  private validateForm(): void {
    if (this.user.password !== this.passwordConfirmed) {
      throw new ValidationError('Password mismatch!');
    }

    this.validationService.checkUsername(this.user.username);
    this.validationService.checkPassword(this.user.password);
    this.validationService.checkEmail(this.user.email);
    this.validationService.checkFullName(this.user.fullName);
  }

  private navigateToProfile(): void {
    this.router.navigate(['/user/' + this.authService.sessionInfo.userId]).then();
  }

  private navigateToErrorPage(): void {
    this.router.navigate(['/internal-service-error']).then();
  }
}
