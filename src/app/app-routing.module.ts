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

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'personal-records', component: PersonalRecordsComponent},
  {path: 'supply-lists', component: SupplyListComponent},
  {path: 'upcoming-races', component: UpcomingRacesComponent},
  {path: 'race-shoes', component: RaceShoesComponent},

  // if no route, redirect to home
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
