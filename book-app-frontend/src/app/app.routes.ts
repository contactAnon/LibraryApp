import { Routes } from '@angular/router';
import { LandingComponent } from '../app/components/landing/landing.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];
