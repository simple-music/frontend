import { Component, OnInit } from '@angular/core';
import {User} from '../../user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor() {
    this.user = {
      id: '1eb9127b-bd40-47c6-aff4-c4f9b2fc8616',
      username: 'user',
      email: 'user@example.com',
      fullName: 'User Name',
      dateOfBirth: new Date(1990, 1, 1),
      musicalInstruments: ['guitar', 'drums', 'bass'],
      numSubscribers: 3,
      numSubscriptions: 3
    };
  }

  ngOnInit() {
  }

}
