import { Routes } from '@angular/router';
import { LandingComponent } from '../app/components/landing/landing.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { AddBookComponent } from './components/addbook/addbook.component';
import { EditBookComponent } from './components/editbook/editbook.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];
