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
import { CreateSupplyListComponent } from './Components/create-supply-list/create-supply-list.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { ViewSupplyListComponent } from './Components/view-supply-list/view-supply-list.component';
import { EditListComponent } from './Components/edit-list/edit-list.component';
import { RaceResultsComponent } from './Components/race-results/race-results.component';
import { RaceShoeDetailComponent } from './Components/race-shoe-detail/race-shoe-detail.component';
import { AddRaceShoeComponent } from './Components/add-race-shoe/add-race-shoe.component';
import { ViewProfileComponent } from './Components/view-profile/view-profile.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'personal-records', component: PersonalRecordsComponent},
  {path: 'supply-lists', component: SupplyListComponent},
  {path: 'upcoming-races', component: UpcomingRacesComponent},
  {path: 'race-shoes', component: RaceShoesComponent},
  {path: 'shoe-detail/:shoeId', component: RaceShoeDetailComponent},
  {path: 'add-shoe', component: AddRaceShoeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'forgot-username', component: ForgotUsernameComponent},
  {path: 'new-user', component: CreateUserComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'edit-profile/:id', component: EditProfileComponent},
  {path: 'new-list', component: CreateSupplyListComponent},
  {path: 'view-list/:id', component: ViewSupplyListComponent},
  {path: 'edit-list/:listId/:itemId', component: EditListComponent},
  {path: 'race-results/:userId', component: RaceResultsComponent},
  

  // if no route, redirect to home
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
