import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Components/User/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/General/about/about.component';
import { PersonalRecordsComponent } from './Components/Results/personal-records/personal-records.component';
import { ContactComponent } from './Components/General/contact/contact.component';
import { SupplyListComponent } from './Components/SupplyLists/supply-list/supply-list.component';
import { UpcomingRacesComponent } from './Components/upcoming-races/upcoming-races.component';
import { RaceShoesComponent } from './Components/Shoes/race-shoes/race-shoes.component';
import { ForgotPasswordComponent } from './Components/User/forgot-password/forgot-password.component';
import { ForgotUsernameComponent } from './Components/User/forgot-username/forgot-username.component';
import { CreateUserComponent } from './Components/User/create-user/create-user.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { CreateSupplyListComponent } from './Components/SupplyLists/create-supply-list/create-supply-list.component';
import { EditProfileComponent } from './Components/User/edit-profile/edit-profile.component';
import { ViewSupplyListComponent } from './Components/SupplyLists/view-supply-list/view-supply-list.component';
import { EditListComponent } from './Components/SupplyLists/edit-list/edit-list.component';
import { RaceResultsComponent } from './Components/Results/race-results/race-results.component';
import { RaceShoeDetailComponent } from './Components/Shoes/race-shoe-detail/race-shoe-detail.component';
import { AddRaceShoeComponent } from './Components/Shoes/add-race-shoe/add-race-shoe.component';
import { ViewListNamesComponent } from './Components/SupplyLists/view-list-names/view-list-names.component';
import { SidebarNavComponent } from './Components/sidebar-nav/sidebar-nav.component';
// import { ViewProfileComponent } from './Components/view-profile/view-profile.component';

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
  // {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'forgot-username', component: ForgotUsernameComponent},
  {path: 'new-user', component: CreateUserComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'edit-profile/:id', component: EditProfileComponent},
  {path: 'new-list', component: CreateSupplyListComponent},
  {path: 'view-list/:id', component: ViewSupplyListComponent},
  {path: 'edit-list', component: EditListComponent},
  {path: 'race-results/:userId', component: RaceResultsComponent},
  {path: 'view-lists', component: ViewListNamesComponent},
  // {path: 'sidebar', component: SidebarNavComponent},
    

  // if no route, redirect to home
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
