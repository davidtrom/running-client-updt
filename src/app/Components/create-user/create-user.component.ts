import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/Models/Gender';
import { ProfileStatus } from 'src/app/Models/ProfileStatus';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { ConfirmedValidator } from 'src/app/Validators/confirmed.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup;
  formNotValid: boolean;
  emailAlreadyTaken: boolean = false;
  successModal: boolean;
  noModal: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      passwordConfirm: ['', Validators.required],
      profileStatus: [ProfileStatus.Public, Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'passwordConfirm')
    });
  }

  get form() { return this.createUserForm.controls; }


  changeStatus(e){
    console.log('Change Status: ', e.target.value);
    if(e.target.value == "true"){
      this.createUserForm.patchValue({profileStatus: ProfileStatus.Public});
      console.log("Status is now Public");
    }
    else{
      this.createUserForm.patchValue({profileStatus: ProfileStatus.Private});
      console.log("Status is now Private");
    }
  }

  setGender(e){
    console.log('Change Status: ', e.target.value);
    if(e.target.value == "Male"){
      this.createUserForm.patchValue({gender: Gender.Male});
      console.log("Gender is Male");
    }
    else if(e.target.value == "Female"){
      this.createUserForm.patchValue({gender: Gender.Female});
      console.log("Gender is Female");
    }
    else if (e.target.value == "Other"){
      this.createUserForm.patchValue({gender: Gender.Other});
      console.log("Gender is Other");
    }
    else{
      this.createUserForm.patchValue({gender: Gender.Undisclosed});
      console.log("Gender is Undisclosed");
    }
 }

  homePageRoute(){
    this.router.navigate(['']);
  }

  onSubmit(): void{
      // if(this.createUserForm.controls.publicStatus.value == true){
      //   this.profileStatus = ProfileStatus.PUBLIC
      // }

      if(this.createUserForm.valid){
        console.log("valid form")
          this.userService.checkUserEmailAvailability(this.createUserForm.controls.email.value).subscribe(
           data =>{
              console.log("email available? ", data);
              if(data){
                let user: User = new User(
                this.createUserForm.controls.firstName.value,
                this.createUserForm.controls.lastName.value,
                this.createUserForm.controls.birthDate.value,
                this.createUserForm.controls.email.value,
                this.createUserForm.controls.city.value,
                this.createUserForm.controls.state.value,
                this.createUserForm.controls.country.value,
                this.createUserForm.controls.gender.value,
                this.createUserForm.controls.password.value,
                this.createUserForm.controls.profileStatus.value
                );

                console.log(user);
      
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
                
                this.successModal = true;
                this.noModal = false;
                //this.router.navigate(['']);
                //this.emailAlreadyTaken = false;
                //this.createUserForm.reset();
              }
              );
            }
            else{
              this.emailAlreadyTaken = true;
            }
      })
    }
      else{
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

