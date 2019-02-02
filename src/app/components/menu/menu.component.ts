import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isUserAuthorized = false;

  constructor(private router: Router,
              private authService: AuthService) {
    this.authService.authEvent
      .subscribe(ok => {
        this.isUserAuthorized = ok;
        if (ok) {
          console.log('ok');
          this.navigateToProfile();
        } else {
          console.log('!ok');
          this.navigateToLogin();
        }
      });
  }

  ngOnInit() {
    this.navigateToLogin();
  }

  onBtnSignInClick() {
    this.navigateToLogin();
  }

  onBtnSignUpClick() {
    this.navigateToRegistration();
  }

  onBtnProfileClick() {
    this.navigateToProfile();
  }

  onBtnSettingsClick() {
    this.navigateToSettings();
  }

  onBtnLogoutClick() {
    this.logout();
  }

  private navigateToProfile(): void {
    if (!this.authService.sessionInfo) {
      this.navigateToLogin();
    }
    const userId = this.authService.sessionInfo.userId;
    this.router.navigate(['/user/' + userId]).then()
      .catch(error => console.log(error));
  }

  private navigateToSettings(): void {
    if (!this.authService.sessionInfo) {
      this.navigateToLogin();
    }
    this.router.navigate(['/settings']).then()
      .catch(error => console.log(error));
  }

  private navigateToLogin(): void {
    if (this.authService.sessionInfo) {
      this.navigateToProfile();
    }
    this.router.navigate(['/login']).then()
      .catch(error => console.log(error));
  }

  private navigateToRegistration(): void {
    if (this.authService.sessionInfo) {
      this.navigateToProfile();
    }
    this.router.navigate(['/registration']).then()
      .catch(error => console.log(error));
  }

  private logout(): void {
    if (this.authService.sessionInfo) {
      this.authService.logout()
        .catch(err => {
          console.log(err);
        });
      this.navigateToLogin();
    }
  }
}
