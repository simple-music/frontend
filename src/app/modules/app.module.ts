import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../components/app.component';
import {MenuComponent} from '../components/menu/menu.component';
import {SearchComponent} from '../components/search/search.component';
import {LoginComponent} from '../components/login/login.component';
import {RegistrationComponent} from '../components/registration/registration.component';
import {UserComponent} from '../components/user/user.component';
import {UserProfileComponent} from '../components/user/user-profile/user-profile.component';
import {UserAvatarComponent} from '../components/user/user-profile/user-avatar/user-avatar.component';
import {SubscriptionComponent} from '../components/user/user-profile/subscription/subscription.component';
import {UsersListComponent} from '../components/user/users-list/users-list.component';
import {UsersListItemComponent} from '../components/user/users-list/users-list-item/users-list-item.component';
import {UserSubscribersComponent} from '../components/user/user-subscribers/user-subscribers.component';
import {UserSubscriptionsComponent} from '../components/user/user-subscriptions/user-subscriptions.component';
import {SettingsComponent} from '../settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SearchComponent,
    LoginComponent,
    RegistrationComponent,
    UserComponent,
    UserProfileComponent,
    UserAvatarComponent,
    SubscriptionComponent,
    UsersListComponent,
    UsersListItemComponent,
    UserSubscribersComponent,
    UserSubscriptionsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
