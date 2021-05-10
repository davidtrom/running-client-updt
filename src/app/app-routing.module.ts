import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'about', component: AboutComponent},

  // if no route, redirect to home
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
