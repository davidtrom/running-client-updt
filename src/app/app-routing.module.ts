import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { PersonalRecordsComponent } from './Components/personal-records/personal-records.component';
import { ContactComponent } from './Components/contact/contact.component';
import { SupplyListComponent } from './Components/supply-list/supply-list.component';
import { UpcomingRacesComponent } from './Components/upcoming-races/upcoming-races.component';
import { RaceShoesComponent } from './Components/race-shoes/race-shoes.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ForgotUsernameComponent } from './Components/forgot-username/forgot-username.component';
import { SidebarNavComponent } from './Components/sidebar-nav/sidebar-nav.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'about', component: AboutComponent},
  {path: 'about', component: SidebarNavComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'personal-records', component: PersonalRecordsComponent},
  {path: 'supply-lists', component: SupplyListComponent},
  {path: 'upcoming-races', component: UpcomingRacesComponent},
  {path: 'race-shoes', component: RaceShoesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'forgot-username', component: ForgotUsernameComponent},
  {path: 'new-user', component: CreateUserComponent},
  {path: 'profile', component: ProfileComponent},
  
  

  // if no route, redirect to home
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
