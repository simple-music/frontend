import {Component, Input, OnInit} from '@angular/core';
import {AvatarsService} from '../../../../services/avatars.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  private avatarPath: string;

  constructor(private avatarsService: AvatarsService) {
  }

  @Input()
  set userId(value: string) {
    this.avatarPath = this.avatarsService.getAvatarPath(value);
  }

  ngOnInit(): void {
  }

  onImgNotLoaded(): void {
    this.avatarPath = this.avatarsService.getDefaultAvatarPath();
  }
}
