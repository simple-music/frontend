import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
      .subscribe(ok => this.isUserAuthorized = ok);
  }

  ngOnInit() {
    this.isUserAuthorized = this.authService.sessionInfo != null;
  }

  onBtnSignInClick() {
    this.router.navigate(['/login']).then();
  }

  onBtnSignUpClick() {
    this.router.navigate(['/registration']).then();
  }

  onBtnProfileClick() {
    this.router.navigate(['/user/' + this.authService.sessionInfo.userId]).then();
  }

  onBtnSettingsClick() {
    this.router.navigate(['/settings']).then();
  }

  onBtnLogoutClick() {
    this.authService.logout()
      .catch(err => {
        console.log(err); // TODO
      });

    this.router.navigate(['/login']).then();
  }
}
