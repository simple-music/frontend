import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UserSubscribersComponent } from './user/user-subscribers/user-subscribers.component';
import { UserSubscriptionsComponent } from './user/user-subscriptions/user-subscriptions.component';

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
