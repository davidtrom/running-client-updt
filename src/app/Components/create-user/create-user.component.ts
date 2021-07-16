import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  password: FormControl;
  passwordConfirm: FormControl;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      birthdate: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      passwordConfirm: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]]
    });
  }

  get form() { return this.createUserForm.controls; }


  onSubmit(): void{
   
  //   if(this.contactForm.valid){
  //     let contact: Contact = new Contact(
  //       null,
  //       this.contactForm.controls.firstName.value,
  //       this.contactForm.controls.lastName.value,
  //       this.contactForm.controls.email.value,
  //       this.contactForm.controls.phoneNum.value,
  //       this.contactForm.controls.birthDate.value,
  //       this.contactForm.controls.reasonForContact.value,
  //       this.contactForm.controls.preferredApptTime.value,
  //       this.contactForm.controls.message.value
  //       );

  //       this.contactService.createContact(contact).subscribe(
  //         data => {
  //           console.log("was email sent? ", data);     
  //         if(data){
  //           alert('Your email has been sent');
  //         }
  //         else {
  //           alert('There was an error, your email has NOT been sent ' + '\n'
  //           + 'Please try again.');
  //         }
  //         this.contactForm.reset();
  //       }
  //       );
  //   }
  //   else{
  //     this.contactForm.markAllAsTouched();
  //     this.formNotValid = true;
  //   }
  // } 
   
   
   
   
   
   
   
   
   if(this.createUserForm.valid){
    //this.submitted = true;
    this.userService.checkUserEmailAvailability(this.createUserForm.controls.email.value).subscribe(
      data =>{
    
      if(!data){
        
        let user: User = new User(
          null,
          this.createUserForm.controls.firstName.value,
          this.createUserForm.controls.lastName.value,
          this.createUserForm.controls.birthdate.value,
          this.createUserForm.controls.email.value,
          this.createUserForm.controls.password.value,
          );

        this.userService.createUser(user).subscribe(
          data => {console.log("in component", data);
          console.log(this.createUserForm.value);
          this.router.navigate(['']);
          this.createUserForm.reset();
          alert('You are now successfully registered! \nProceeding to Login...');
          }
        );
      }
      else{
        this.emailAlreadyTaken = true;
      }
    });  
  }
}
}
