import {Component, Input, OnInit} from '@angular/core';
import {AvatarsService} from '../../../../services/avatars.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  @Input() userId: string;

  avatarPath: string;

  constructor(private avatarsService: AvatarsService) {
  }

  ngOnInit() {
    this.avatarsService.getAvatar(this.userId)
      .subscribe(path => this.avatarPath = path);
  }
}
