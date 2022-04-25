import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RaceResult } from 'src/app/Models/race-result.model';
import { RaceShoe } from 'src/app/Models/race-shoe.model';
import { ResultService } from 'src/app/Services/result.service';
import { ShoeService } from 'src/app/Services/shoe.service';

@Component({
  selector: 'app-manual-result',
  templateUrl: './manual-result.component.html',
  styleUrls: ['./manual-result.component.css']
})
export class ManualResultComponent implements OnInit {
  formNotValid: boolean;
  manualResultForm: FormGroup;
  raceShoes: RaceShoe[];
  allShoes: RaceShoe[];
  activeShoes: RaceShoe[];
  addRaceShoe: boolean;
  noShoes: boolean;
  raceShoeId: number;
  //userId to test mock data
  userId: number;

  //Set heartRate, elevationGain and cadence to null unless they are set in the form?


  constructor(private fb: FormBuilder, private router: Router, private shoeService: ShoeService, private resultService: ResultService) { }
  addtlMetrics: boolean = false;
  isDisabled: boolean = true;

  ngOnInit(): void {
    this.manualResultForm = this.fb.group({
      raceName: ['', Validators.required],
      distance: ['', Validators.required],
      raceDate: ['', Validators.required],
      weather: [''],
      description: [''],
      location: ['', Validators.required],
      timingCo: [''],
      overallPlace: ['', Validators.required],
      totalParticipants: ['', Validators.required],
      age: ['', Validators.required],
      ageGroupPlace: ['', Validators.required],
      ageGroupParticipants: [''],
      timeElapsed: ['', Validators.required],
      pace: ['',Validators.required],
      heartRate: [''],
      elevationGain: [''],
      cadence: ['']
    })
    this.userId = 1;
    this.getUserShoes();
    
  }

  get form() { return this.manualResultForm.controls; }

  getUserShoes(){
    this.shoeService.getUserShoes(this.userId).subscribe(data => {
      this.allShoes = data;
      console.log("allShoes", data);
      if(this.allShoes.length == 0){
        this.noShoes = true;
      }
      else{
        this.getActiveShoes();
      }
    })
    console.log("All Shoes: ", this.activeShoes);
  }

  getActiveShoes(){
      this.shoeService.getActiveShoes(this.userId).subscribe(data => this.activeShoes = data);
  }

  setRaceShoe(e){
    console.log('Change Status: ', e.target.value);
    // GET LIST OF RACE SHOES AND DISPLAY THEM HERE IN A DROP DOWN
    this.raceShoeId = 99;
    // if(e.target.value == "Male"){
    //   this.manualResultForm.patchValue({gender: Gender.Male});
    //   console.log("Gender is Male");
    // }
    // else if(e.target.value == "Female"){
    //   this.createUserForm.patchValue({gender: Gender.Female});
    //   console.log("Gender is Female");
    // }
    // else if(e.target.value =="Transgender"){
    //   this.createUserForm.patchValue({gender: Gender.Transgender});
    // }
    // else if (e.target.value == "Other"){
    //   this.createUserForm.patchValue({gender: Gender.Other});
    //   console.log("Gender is Other");
    // }
    // else{
    //   this.createUserForm.patchValue({gender: Gender.Undisclosed});
    //   console.log("Gender is Undisclosed");
    // }
 }



  homePageRoute(){
    this.router.navigate(['results-home']);
  }

  showRaceShoes(){
    this.addRaceShoe = ! this.addRaceShoe;
  }

  showAddtlMetrics(){
    this.addtlMetrics = ! this.addtlMetrics;
    // this.isDisabled = ! this.isDisabled;
    console.log("addtlMetrics: " + this.addtlMetrics)
    // if(this.isDisabled === true){
    //   this.isDisabled = false;
    // }
    // else{
    //   this.isDisabled = true;
    // }
    // return this.isDisabled;
  }

  onSubmit(){
    if(this.manualResultForm.valid){
      let manualResult: RaceResult= new RaceResult(
        this.userId,
        52,
        this.manualResultForm.controls.raceName.value,
        this.manualResultForm.controls.distance.value,
        this.manualResultForm.controls.raceDate.value,
        this.manualResultForm.controls.weather.value,
        this.manualResultForm.controls.description.value,
        this.manualResultForm.controls.location.value,
        this.manualResultForm.controls.timingCo.value,
        this.manualResultForm.controls.overallPlace.value,
        this.manualResultForm.controls.totalParticipants.value,
        this.manualResultForm.controls.age.value,
        this.manualResultForm.controls.ageGroupPlace.value,
        this.manualResultForm.controls.ageGroupParticipants.value,
        this.manualResultForm.controls.pace.value,
        this.manualResultForm.controls.timeElapsed.value,
        this.manualResultForm.controls.heartRate.value,
        this.manualResultForm.controls.elevationGain.value,
        this.manualResultForm.controls.cadence.value
      );
      //this.resu
    }
  }



}
