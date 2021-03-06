import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

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
import {SettingsComponent} from '../components/settings/settings.component';
import {NotFoundErrorComponent} from '../components/errors/not-found-error/not-found-error.component';
import {InternalServiceErrorComponent} from '../components/errors/internal-service-error/internal-service-error.component';

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
    SettingsComponent,
    NotFoundErrorComponent,
    InternalServiceErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
