import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {NotFoundError} from '../../errors/not-found-error';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  username: string;

  constructor(private router: Router,
              private usersService: UsersService) {
  }

  ngOnInit() {
  }

  onBtnClick(): void {
    this.usersService.findUser(this.username)
      .then(user => this.navigateToUser(user.id))
      .catch(error => {
        if (error instanceof NotFoundError) {
          this.navigateToNotFound();
        } else {
          this.navigateToErrorPage();
        }
      });
  }

  private navigateToUser(userId: string): void {
    console.log(userId);
    this.router.navigate(['/user/' + userId]).then();
  }

  private navigateToNotFound(): void {
    this.router.navigate(['/not-found-error']).then();
  }

  private navigateToErrorPage(): void {
    this.router.navigate(['/internal-service-error']).then();
  }
}
