import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {isUndefined} from 'util';

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
          this.navigateToProfile();
        } else {
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
    const userId = this.authService.sessionInfo.userId;
    if (isUndefined(userId)) {
      this.navigateToLogin();
    }
    this.router.navigate(['/user/' + userId]).then()
      .catch(error => console.log(error));
  }

  private navigateToSettings(): void {
    this.router.navigate(['/settings']).then()
      .catch(error => console.log(error));
  }

  private navigateToLogin(): void {
    this.router.navigate(['/login']).then()
      .catch(error => console.log(error));
  }

  private navigateToRegistration(): void {
    this.router.navigate(['/registration']).then()
      .catch(error => console.log(error));
  }

  private logout(): void {
    this.authService.logout()
      .catch(err => {
        console.log(err);
      });
    this.navigateToLogin();
  }
}
