import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Credentials} from '../../models/credentials';
import {NotAuthorizedError} from '../../errors/not-authorized-error';
import {ValidationService} from '../../services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials = new Credentials();

  error: string;

  constructor(private router: Router,
              private validationService: ValidationService,
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

    this.authService.login(this.credentials)
      .then(() => this.navigateToProfile())
      .catch(err => {
        if (err instanceof NotAuthorizedError) {
          this.error = 'Wrong username or password!';
        } else {
          this.navigateToErrorPage();
        }
      });
  }

  private validateForm(): void {
    this.validationService.checkUsername(this.credentials.username);
    this.validationService.checkPassword(this.credentials.password);
  }

  private navigateToProfile(): void {
    this.router.navigate(['/user/' + this.authService.sessionInfo.userId]).then();
  }

  private navigateToErrorPage(): void {
    this.router.navigate(['/internal-service-error']).then();
  }
}
