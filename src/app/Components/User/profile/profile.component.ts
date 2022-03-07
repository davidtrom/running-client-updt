import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userId: number;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    //FOR TESTING PURPOSES
    this.userId = 1;

    this.userService.getUserById(this.userId).subscribe(data => {this.user = data;});

    // this.userService.getUserByEmail('davidtrom@hotmail.com').subscribe(userData => {
    //   this.user = userData;
    // });
    
    // this.userService.getUserByEmail(sessionStorage.getItem('username')).subscribe(userData => {
    //   this.user = userData;
    // });
  }

  // getRouteParams(){
  //   console.log("userId: ", this.userId);
  //   this.route.params.subscribe(routeParams => {
  //     this.userService.getUserById(this.userId).subscribe(data => {this.user = data;})
  //   });
  // }

}
