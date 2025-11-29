import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { BookFormComponent } from '../app/components/book-form/book-form.components';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'book-form', component: BookFormComponent, canActivate: [AuthGuard] },
  {
    path: 'book-form/:id',
    component: BookFormComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];
