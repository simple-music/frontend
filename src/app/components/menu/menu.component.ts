import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userAuthorized = false;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userAuthorized = this.authService.sessionInfo != null;
  }

  onBtnSignInClick() {
    this.router.navigate(['/login']);
  }

  onBtnSignUpClick() {
    this.router.navigate(['/registration']);
  }
}
