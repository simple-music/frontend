import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

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
      .subscribe(user => this.router.navigate(['/user/' + user.id]));
  }
}
