import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Credentials} from '../../models/credentials';
import {NotAuthorizedError} from '../../errors/not-authorized-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials = new Credentials();

  error: string;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.sessionInfo) {
      this.navigateToProfile();
    }
  }

  onBtnSubmitClick() {
    this.error = null;
    this.authService.login(this.credentials)
      .then(() => this.navigateToProfile())
      .catch(err => {
        if (err instanceof NotAuthorizedError) {
          this.error = 'Wrong username or password!';
        } else {
          console.log('Internal error: ', err); // TODO
        }
      });
  }

  private navigateToProfile(): void {
    this.router.navigate(['/user/' + this.authService.sessionInfo.userId]);
  }
}
