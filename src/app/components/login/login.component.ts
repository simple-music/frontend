import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Credentials} from '../../models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials = new Credentials();

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.sessionInfo) {
      this.navigateToProfile();
    }
  }

  onBtnSubmitClick() {
    this.authService.login(this.credentials)
      .subscribe(() => {
        this.navigateToProfile();
      });
  }

  private navigateToProfile(): void {
    this.router.navigate(['/user/' + this.authService.sessionInfo.userId]);
  }
}
