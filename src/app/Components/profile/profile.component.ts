import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUserById(1).subscribe(userData => {this.user = userData;})

    // this.userService.getUserByEmail('davidtrom@hotmail.com').subscribe(userData => {
    //   this.user = userData;
    // });
    
    // this.userService.getUserByEmail(sessionStorage.getItem('username')).subscribe(userData => {
    //   this.user = userData;
    // });
  }

}
