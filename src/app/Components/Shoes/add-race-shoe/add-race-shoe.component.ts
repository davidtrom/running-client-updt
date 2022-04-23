import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  newShoeForm: FormGroup;
  formNotValid: boolean;
  //loading: boolean;
  shoeBrands: string[];
  
  //USER ID FOR TESTING:
  userId: number;


  constructor(private fb: FormBuilder, private router: Router, private shoeService: ShoeService) { }

  ngOnInit(): void {

    this.userId = 1;

    this.shoeService.getUserShoes(this.userId).subscribe(data => {
      this.userShoes = data;
      this.checkForShoes();
    });

    this.newShoeForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      nickname: ['', Validators.required],
      maxMiles: [''],
      numOfMiles: ['', Validators.required], 
      beginUse: ['', Validators.required],
      isActive: [true, Validators.required],
      shoeDescription: ['']
    })

    this.shoeBrands = ["Adidas", "Altra", "ASICS", "Brooks", "Hoka", "Merrell", "Mizuno", "New Balance", "Nike", "Saucony", "Sketchers", "Newton", "On", "Reebok", "Salomon", "Under Armour", "Vibram"]

  }

  checkForShoes() {
    if (this.userShoes.length != 0){
      this.noShoes = false;
    }
    else {
      this.noShoes = true;
    }
  }

  get form() { return this.newShoeForm.controls; }

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

  onSubmit(){
    if(this.newShoeForm.valid){
      let shoe: RaceShoe = new RaceShoe(
        this.userId,
        this.newShoeForm.controls.brand.value,
        this.newShoeForm.controls.model.value,
        this.newShoeForm.controls.nickname.value,
        this.newShoeForm.controls.numOfMiles.value,
        this.newShoeForm.controls.maxMiles.value,
        this.newShoeForm.controls.beginUse.value,
        this.newShoeForm.controls.isActive.value,
        this.newShoeForm.controls.shoeDescription.value,
        );

      this.shoeService.createUserShoe(shoe).subscribe(data => {
        console.log(data);})
        this.mainShoesRoute();
    }
    else{
      this.newShoeForm.markAllAsTouched();
      this.formNotValid = true;
    }

  }

}
