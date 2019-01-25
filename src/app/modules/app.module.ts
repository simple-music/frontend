import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../components/app.component';
import { MenuComponent } from '../components/menu/menu.component';
import { SearchComponent } from '../components/search/search.component';
import { UserComponent } from '../components/user/user.component';
import { UserProfileComponent } from '../components/user/user-profile/user-profile.component';
import { UsersListComponent } from '../components/user/users-list/users-list.component';
import { UserSubscribersComponent } from '../components/user/user-subscribers/user-subscribers.component';
import { UserSubscriptionsComponent } from '../components/user/user-subscriptions/user-subscriptions.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SearchComponent,
    UserComponent,
    UserProfileComponent,
    UsersListComponent,
    UserSubscribersComponent,
    UserSubscriptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
