import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {UserComponent} from '../components/user/user.component';
import {RegistrationComponent} from '../components/registration/registration.component';
import {SettingsComponent} from '../components/settings/settings.component';
import {NotFoundErrorComponent} from '../components/errors/not-found-error/not-found-error.component';
import {InternalServiceErrorComponent} from '../components/errors/internal-service-error/internal-service-error.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'not-found-error', component: NotFoundErrorComponent},
  {path: 'internal-service-error', component: InternalServiceErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
