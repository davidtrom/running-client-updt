import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup;
  submitted : boolean = false;
  emailAlreadyTaken: boolean = false;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      birthdate: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      link: ['']
    });
  }

  get form() { return this.createUserForm.controls; }

  onSubmit(): void{
    // this.authenticationService.checkVolunteerEmailAvailability(this.createUserForm.controls.email.value).subscribe(
    //   data =>{
    
    //   if(!data){
        
    //     let user: User = new User(
    //       null,
    //       this.createUserForm.controls.firstName.value,
    //       this.createUserForm.controls.lastName.value,
    //       this.createUserForm.controls.phoneNum.value,
    //       this.createUserForm.controls.email.value,
    //       this.createUserForm.controls.password.value,
    //       this.createUserForm.controls.link.value
    //       );

    //     this.loginService.createVolunteer(volunteer).subscribe(
    //       data => {console.log("in component", data);
    //       console.log(this.createUserForm.value);
    //       this.router.navigate(['/volunteer-login']);
    //       this.createUserForm.reset();
    //       alert('You are now successfully registered! \nProceeding to Login...');
    //       }
    //     );
    //   }
    //   else{
    //     this.emailAlreadyTaken = true;
    //   }
    // });  
  }

}
