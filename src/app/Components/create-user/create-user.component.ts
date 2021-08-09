import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { User } from 'src/app/Models/user.model';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup;
  // submitted: boolean = false;
  formNotValid: boolean;
  emailAlreadyTaken: boolean = false;
  myPublicStatus: boolean = true;
  //password: FormControl;
  //passwordConfirm: FormControl;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      //passwordConfirm: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      publicStatus: ['true', Validators.required]
    });
  }

  get form() { return this.createUserForm.controls; }

  // doPasswordsMatch(password: string, passwordConfirm: string): boolean {
  //   if(password === passwordConfirm){
  //   return true;
  //   }
  //   else return false
  // }

  changeStatus(e){
    this.createUserForm.patchValue({publicStatus: e.target.value});
    console.log('Change Status: ', e.target.value);
  }

  // changePublicStatus(): boolean {
  //   this.publicStatus = false;
  //   return this.publicStatus;
  // }


  onSubmit(): void{
    if(this.createUserForm.valid){
      console.log("valid form")
      // this.userService.checkUserEmailAvailability(this.createUserForm.controls.email.value).subscribe(
      //   data =>{

      let user: User = new User(
        this.createUserForm.controls.firstName.value,
        this.createUserForm.controls.lastName.value,
        this.createUserForm.controls.birthDate.value,
        this.createUserForm.controls.email.value,
        this.createUserForm.controls.password.value,
        this.createUserForm.controls.publicStatus.value
        );

        //console.log('user available: ', data)

        this.userService.createUser(user).subscribe(
          data => {
            console.log("user created ", data);     
          // if(data){
          //   alert('Your email has been sent');
          // }
          // else {
          //   alert('There was an error, your email has NOT been sent ' + '\n'
          //   + 'Please try again.');
          //}
          this.createUserForm.reset();
        }
        );
    //})
  }
    else{
      console.log('errors: ', 
      this.createUserForm.value )
      this.createUserForm.markAllAsTouched();
      this.formNotValid = true;
    }
  } 
   
   
   
   
   
   
   
   
  //  if(this.createUserForm.valid){
  //    console.log("valid form")
    // this.userService.checkUserEmailAvailability(this.createUserForm.controls.email.value).subscribe(
    //   data =>{
    
    //   if(!data){
        
    //     let user: User = new User(
    //       null,
    //       this.createUserForm.controls.firstName.value,
    //       this.createUserForm.controls.lastName.value,
    //       this.createUserForm.controls.birthdate.value,
    //       this.createUserForm.controls.email.value,
    //       this.createUserForm.controls.password.value,
    //       );

    //     this.userService.createUser(user).subscribe(
    //       data => {console.log("in component", data);
    //       console.log(this.createUserForm.value);
    //       this.router.navigate(['']);
    //       this.createUserForm.reset();
    //       alert('You are now successfully registered! \nProceeding to Login...');
    //       }
    //     );
    //   }
    //   else{
    //     this.emailAlreadyTaken = true;
    //   }
    // });  
  // }
  // else{
  //   this.createUserForm.markAllAsTouched();
  //   this.formNotValid = true;
  // }
// }

}
