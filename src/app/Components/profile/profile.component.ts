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

  currentUser: User;

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserByEmail(sessionStorage.getItem('username')).subscribe(userData => {
      this.currentUser = userData;
    });
  }

}
