import { Routes } from '@angular/router';
import { LandingComponent } from '../app/components/landing/landing.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { AddBookComponent } from './components/addbook/addbook.component';
import { EditBookComponent } from './components/editbook/editbook.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { AddQuoteComponent } from './components/quotes/add-quote.component';
import { EditQuoteComponent } from './components/quotes/edit-quote.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'add-quote', component: AddQuoteComponent },
  { path: 'edit-quote/:id', component: EditQuoteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];
