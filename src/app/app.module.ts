import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './Components/about/about.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { PersonalRecordsComponent } from './Components/personal-records/personal-records.component';
import { UpcomingRacesComponent } from './Components/upcoming-races/upcoming-races.component';
import { SupplyListComponent } from './Components/supply-list/supply-list.component';
import { ContactComponent } from './Components/contact/contact.component';
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
    RaceShoesComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ForgotUsernameComponent,
    SidebarNavComponent,
    CreateUserComponent,
    ProfileComponent,
  
    CreateSupplyListComponent,
       EditProfileComponent,
       ViewSupplyListComponent,
       EditListComponent
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
