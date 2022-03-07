import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './Components/General/about/about.component';
import { LoginComponent } from './Components/User/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HeaderComponent } from './Components/General/header/header.component';
import { FooterComponent } from './Components/General/footer/footer.component';
import { PersonalRecordsComponent } from './Components/Results/personal-records/personal-records.component';
import { UpcomingRacesComponent } from './Components/upcoming-races/upcoming-races.component';
import { SupplyListComponent } from './Components/SupplyLists/supply-list/supply-list.component';
import { ContactComponent } from './Components/General/contact/contact.component';
import { ForgotPasswordComponent } from './Components/User/forgot-password/forgot-password.component';
import { ForgotUsernameComponent } from './Components/User/forgot-username/forgot-username.component';
import { SidebarNavComponent } from './Components/sidebar-nav/sidebar-nav.component';
import { CreateUserComponent } from './Components/User/create-user/create-user.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { CreateSupplyListComponent } from './Components/SupplyLists/create-supply-list/create-supply-list.component';
import { EditProfileComponent } from './Components/User/edit-profile/edit-profile.component';
import { ViewSupplyListComponent } from './Components/SupplyLists/view-supply-list/view-supply-list.component';
import { EditListComponent } from './Components/SupplyLists/edit-list/edit-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RaceResultsComponent } from './Components/Results/race-results/race-results.component';
import { AddRaceShoeComponent } from './Components/Shoes/add-race-shoe/add-race-shoe.component';
import { RaceShoeDetailComponent } from './Components/Shoes/race-shoe-detail/race-shoe-detail.component';
import { RaceShoesComponent } from './Components/Shoes/race-shoes/race-shoes.component';
import { ViewProfileComponent } from './Components/User/view-profile/view-profile.component';
import { ViewListNamesComponent } from './Components/SupplyLists/view-list-names/view-list-names.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    PersonalRecordsComponent,
    UpcomingRacesComponent,
    SupplyListComponent,
    ContactComponent,
    ForgotPasswordComponent,
    ForgotUsernameComponent,
    SidebarNavComponent,
    CreateUserComponent,
    ProfileComponent,
    CreateSupplyListComponent,
    EditProfileComponent,
    ViewSupplyListComponent,
    EditListComponent,
    RaceResultsComponent,
    AddRaceShoeComponent,
    RaceShoeDetailComponent,
    RaceShoesComponent,
    ViewProfileComponent,
    ViewListNamesComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
