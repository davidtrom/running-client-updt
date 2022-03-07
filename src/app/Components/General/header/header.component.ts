import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  subscription: Subscription;
  userLoggedIn: boolean = true;
  userId: number;
  user: User;

  constructor(private authService:AuthenticationService, private route: ActivatedRoute) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.subscription = this.authService.getLoginStatus().subscribe(data => {this.userLoggedIn = data;});
    // if(!this.userLoggedIn){
    //   if(sessionStorage.getItem("username") == "userName" && sessionStorage.getItem("token") != null) {
    //     this.userLoggedIn = true;
    //   }
    // }

    // this.getRouteParams();

     //USED FOR TESTING:
    this.userId=1;
  }

  // getRouteParams(){
  //   this.route.params.subscribe(routeParams => {
  //     this.authService.getUser(+(routeParams.userId)).subscribe(data => {this.user = data;})
  //   });
  // }

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

  //Need to subscribe to user.id or get it from localstorage

}
