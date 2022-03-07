import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/Models/Gender';
import { ProfileStatus } from 'src/app/Models/ProfileStatus';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import {formatDate} from '@angular/common'
import { EditUser } from 'src/app/Models/edit-user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editUserForm: FormGroup;
  user$: User;
  isEmailAvailable: boolean;
  newEmail: string;
  isEmailDifferent: boolean;
  formNotValid: boolean;
  dateString: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
    //this.userService.getCurrentUser().subscribe(data => {this.user$ = data});
    this.userService.getUserById(1).subscribe(userData => {this.user$ = userData;
      this.dateString = formatDate(this.user$.birthday, 'yyyy-MM-dd', this.locale);
      this.editUserForm = this.fb.group({
        firstName: [this.user$.firstName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        lastName: [this.user$.lastName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        birthDate: [this.dateString, Validators.required],
        city: [this.user$.locationCity, Validators.required],
        state: [this.user$.locationState, Validators.required],
        country: [this.user$.locationCountry, Validators.required],
        gender: [this.user$.gender, Validators.required],
        profileStatus: [this.user$.profileStatus, Validators.required]
      });
    })    
  }

  get form() { return this.editUserForm.controls; }

  onSubmit(){
    if (this.editUserForm.valid){
      let editUser: EditUser = new EditUser(
        this.user$.id,
        this.editUserForm.controls.firstName.value,
        this.editUserForm.controls.lastName.value,
        this.editUserForm.controls.birthDate.value,
        this.editUserForm.controls.city.value,
        this.editUserForm.controls.state.value,
        this.editUserForm.controls.country.value,
        this.editUserForm.controls.gender.value,
        this.editUserForm.controls.profileStatus.value
      );

      this.userService.updateUser(editUser).subscribe(data => this.user$ = data);
      this.profileRoute();
    }
    else{
      this.editUserForm.markAllAsTouched();
      this.formNotValid = true;
    }
  }


  // userProfileRoute(){
  //   this.router.navigate(['profile']);
  // }


      // this.userService.updateUserProfile(this.user$.id, this.editUserForm.controls.firstName.value, this.editUserForm.controls.lastName.value, this.editUserForm.controls.phoneNum.value, this.editUserForm.controls.link.value).subscribe(
      //     data => {console.log("updating user", data);
      //           if(data !== null){
      //             alert('Your profile has been successfully updated');
      //             this.editUserForm.reset();
      //             this.router.navigate(['/view-profile']);
      //           }
      //           else{
      //             alert('There was an error, please try again');
      //           }
      //         });
      // }

  profileRoute(){
    this.router.navigate(['profile/:id']);
  }

  changeStatus(e){
    console.log('Change Status: ', e.target.value);
    if(e.target.value == "true"){
      this.editUserForm.patchValue({profileStatus: ProfileStatus.Public});
      console.log("Status is now Public");
    }
    else{
      this.editUserForm.patchValue({profileStatus: ProfileStatus.Private});
      console.log("Status is now Private");
    }
  }

  setGender(e){
    console.log('Change Status: ', e.target.value);
    if(e.target.value == "Male"){
      this.editUserForm.patchValue({gender: Gender.Male});
      console.log("Gender is Male");
    }
    else if(e.target.value == "Female"){
      this.editUserForm.patchValue({gender: Gender.Female});
      console.log("Gender is Female");
    }
    else if(e.target.value =="Transgender"){
      this.editUserForm.patchValue({gender: Gender.Transgender});
    }
    else if (e.target.value == "Other"){
      this.editUserForm.patchValue({gender: Gender.Other});
      console.log("Gender is Other");
    }
    else{
      this.editUserForm.patchValue({gender: Gender.Undisclosed});
      console.log("Gender is Undisclosed");
    }
 }
}
