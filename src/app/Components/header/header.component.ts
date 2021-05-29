import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  subscription: Subscription;
  userLoggedIn: boolean = false;

  constructor(private authService:AuthenticationService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.authService.getLoginStatus().subscribe(data => {this.userLoggedIn = data;});
    if(!this.userLoggedIn){
      if(sessionStorage.getItem("username") == "userName" && sessionStorage.getItem("token") != null) {
        this.userLoggedIn = true;
      }
    }
  }

  collapse(): boolean{
    if(this.collapsed === true){
      this.collapsed = false;
    }
    else{
      this.collapsed = true;
    }
    return this.collapsed;
  }

  logOut(): boolean{
    this.userLoggedIn = false;
    this.authService.logOut();
    this.authService.setUserLoggedIn(false);
    return this.collapse();
  }

}
