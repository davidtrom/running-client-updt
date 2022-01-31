import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileStatus } from 'src/app/Models/ProfileStatus';
import { RaceShoe } from 'src/app/Models/race-shoe.model';
import { ShoeService } from 'src/app/Services/shoe.service';

@Component({
  selector: 'app-add-race-shoe',
  templateUrl: './add-race-shoe.component.html',
  styleUrls: ['./add-race-shoe.component.css']
})
export class AddRaceShoeComponent implements OnInit {
  noShoes: boolean;
  userShoes: RaceShoe[];
  userId: number;
  newShoeForm: FormGroup;
  formNotValid: boolean;


  constructor(private fb: FormBuilder, private router: Router, private shoeService: ShoeService) { }

  ngOnInit(): void {

    this.shoeService.getUserShoes(this.userId).subscribe(data => {
      this.userShoes = data;
      this.checkForShoes(this.userShoes);
    });

    this.newShoeForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      shoeDescription: [''],
      numOfMiles: ['', Validators.required], 
      beginUse: ['', Validators.required],
      isActive: ['', Validators.required]
    })
  }

  checkForShoes(shoes: RaceShoe[]) {
    if (this.userShoes.length != 0){
      this.noShoes = false;
    }
    else {
      this.noShoes = true;
    }
  }

  get form() { return this.newShoeForm.controls; }

  onSubmit(){

  }

  mainShoesRoute(){
    this.router.navigate(['race-shoes']);
  }

  changeStatus(e){
    console.log('Change Status: ', e.target.value);
    if(e.target.value == "true"){
      this.newShoeForm.patchValue({isActive: true});
      console.log("Status is now True");
    }
    else{
      this.newShoeForm.patchValue({isActive: false});
      console.log("Status is now False");
    }
  }

}
