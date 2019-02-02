import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarsService {
  constructor(private apiService: ApiService) {
  }

  public getAvatarPath(userId: string): string {
    return this.apiService.makePath('/users/' + userId + '/avatar');
  }

  public getDefaultAvatarPath(): string {
    return this.getAvatarPath('default');
  }
}
