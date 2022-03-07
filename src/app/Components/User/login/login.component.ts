import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formNotValid: boolean;
  loginForm :FormGroup;
  invalidLogin: boolean;
  userLoggedIn: boolean;
  constructor(private fb:FormBuilder, private authService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.getLoginStatus().subscribe(data => this.userLoggedIn = data);
  }

  get form() { return this.loginForm.controls; }

  onSubmit(): void{
    console.log(this.loginForm.controls.username.value);
    console.log(this.loginForm.controls.password.value);
  //   if (this.loginForm.controls.pastorUsername.value === "" || this.loginForm.controls.pastorPassword.value === "") {
  //     this.invalidLogin = true;
  //     console.log(this.invalidLogin);
  //     return;
  // }
  if(this.loginForm.invalid){
    this.invalidLogin = true;
    this.loginForm.reset();
  }
  
    this.authService.verifyUser(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(data =>{
      console.log("logging in ", data);
      //sessionStorage.setItem("token", data.jwt);
      if (data == null){
        this. invalidLogin = true;
      }
      else {
        this.router.navigate(['/dashboard']);
      }
      // if(this.pastorLoggedIn){
      //   this.router.navigate(['/pastor-dashboard']);
      // }
      // else if (data == null){
      //   this.invalidLogin = true;
      // }
    })
  }

}
